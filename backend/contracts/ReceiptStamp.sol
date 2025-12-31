// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/// @notice Receipt stamping contract (EVM version).
/// Stores receipt metadata and enforces stamp/royalty fees.
contract ReceiptStamp is Ownable, ReentrancyGuard {
    uint256 public constant MAX_PAGE_SIZE = 10;
    uint256 public constant MAX_TEXT_LENGTH = 160;

    struct Receipt {
        uint256 id;
        address creator;
        address owner;
        address royaltyRecipient;
        string text;
        uint256 createdAt;
        bool minted;
    }

    uint256 public lastId;
    uint256 public totalSubmissions;
    uint256 public totalTransfers;
    uint256 public totalStampFee;
    uint256 public totalRoyaltyFee;

    address public admin;
    address public treasury;
    address public nftContract;

    uint256 public stampFee;
    uint256 public royaltyFee;

    mapping(uint256 => Receipt) private receipts;

    error NotOwner();
    error NotCreator();
    error NotAuthorized();
    error NotFound();
    error InvalidRecipient();
    error InvalidText();
    error WrongFee();
    error AlreadyMinted();
    error InvalidLimit();
    error ZeroAddress();

    event ReceiptSubmitted(
        uint256 indexed id,
        address indexed creator,
        address indexed owner,
        address royaltyRecipient,
        uint256 createdAt
    );
    event ReceiptTransferred(
        uint256 indexed id,
        address indexed from,
        address indexed to,
        address royaltyRecipient
    );
    event ReceiptRoyaltyUpdated(
        uint256 indexed id,
        address indexed creator,
        address indexed newRecipient
    );
    event ReceiptMinted(uint256 indexed id, address indexed nftContract);
    event AdminUpdated(address indexed previousAdmin, address indexed newAdmin);
    event TreasuryUpdated(address indexed previousTreasury, address indexed newTreasury);
    event FeesUpdated(uint256 newStampFee, uint256 newRoyaltyFee);
    event NftContractUpdated(address indexed previousNft, address indexed newNft);

    modifier onlyAdmin() {
        if (msg.sender != admin) revert NotAuthorized();
        _;
    }

    modifier onlyNftContract() {
        if (msg.sender != nftContract) revert NotAuthorized();
        _;
    }

    constructor(
        address initialOwner,
        address initialTreasury,
        uint256 initialStampFee,
        uint256 initialRoyaltyFee
    ) Ownable(initialOwner) {
        if (initialTreasury == address(0)) revert ZeroAddress();
        admin = initialOwner;
        treasury = initialTreasury;
        stampFee = initialStampFee;
        royaltyFee = initialRoyaltyFee;
    }

    function setAdmin(address newAdmin) external onlyAdmin {
        if (newAdmin == address(0)) revert ZeroAddress();
        address old = admin;
        admin = newAdmin;
        emit AdminUpdated(old, newAdmin);
    }

    function setTreasury(address newTreasury) external onlyAdmin {
        if (newTreasury == address(0)) revert ZeroAddress();
        address old = treasury;
        treasury = newTreasury;
        emit TreasuryUpdated(old, newTreasury);
    }

    function setFees(uint256 newStampFee, uint256 newRoyaltyFee) external onlyAdmin {
        stampFee = newStampFee;
        royaltyFee = newRoyaltyFee;
        emit FeesUpdated(newStampFee, newRoyaltyFee);
    }

    function setNftContract(address newNftContract) external onlyAdmin {
        if (newNftContract == address(0)) revert ZeroAddress();
        address old = nftContract;
        nftContract = newNftContract;
        emit NftContractUpdated(old, newNftContract);
    }

    function submitReceipt(string calldata text) external payable nonReentrant returns (uint256) {
        return _insertReceipt(text, msg.sender);
    }

    function submitReceiptFor(
        string calldata text,
        address recipient
    ) external payable nonReentrant returns (uint256) {
        if (recipient == address(0)) revert InvalidRecipient();
        return _insertReceipt(text, recipient);
    }

    function transferReceipt(uint256 id, address newOwner) external payable nonReentrant {
        if (newOwner == address(0)) revert InvalidRecipient();
        Receipt storage receipt = receipts[id];
        if (receipt.id == 0) revert NotFound();
        if (receipt.owner != msg.sender) revert NotOwner();

        bool royaltyApplies = royaltyFee > 0 && msg.sender != receipt.royaltyRecipient;
        if (royaltyApplies) {
            if (msg.value != royaltyFee) revert WrongFee();
            _safeTransfer(royaltyFee, receipt.royaltyRecipient);
            totalRoyaltyFee += royaltyFee;
        } else {
            if (msg.value != 0) revert WrongFee();
        }

        receipt.owner = newOwner;
        totalTransfers += 1;

        emit ReceiptTransferred(id, msg.sender, newOwner, receipt.royaltyRecipient);
    }

    function setReceiptRoyaltyRecipient(
        uint256 id,
        address newRecipient
    ) external nonReentrant {
        if (newRecipient == address(0)) revert InvalidRecipient();
        Receipt storage receipt = receipts[id];
        if (receipt.id == 0) revert NotFound();
        if (receipt.creator != msg.sender) revert NotCreator();

        receipt.royaltyRecipient = newRecipient;
        emit ReceiptRoyaltyUpdated(id, msg.sender, newRecipient);
    }

    function markMinted(uint256 id) external onlyNftContract {
        Receipt storage receipt = receipts[id];
        if (receipt.id == 0) revert NotFound();
        if (receipt.minted) revert AlreadyMinted();
        receipt.minted = true;
        emit ReceiptMinted(id, msg.sender);
    }

    function getReceipt(uint256 id) external view returns (Receipt memory) {
        Receipt memory receipt = receipts[id];
        if (receipt.id == 0) revert NotFound();
        return receipt;
    }

    function getReceiptsRange(
        uint256 startId,
        uint256 limit
    ) external view returns (Receipt[] memory) {
        if (limit == 0 || limit > MAX_PAGE_SIZE) revert InvalidLimit();
        if (startId == 0) startId = 1;
        uint256 end = startId + limit - 1;
        if (end > lastId) {
            end = lastId;
        }

        Receipt[] memory temp = new Receipt[](limit);
        uint256 count = 0;
        for (uint256 i = startId; i <= end; i++) {
            Receipt memory receipt = receipts[i];
            if (receipt.id == 0) continue;
            temp[count] = receipt;
            count += 1;
        }

        Receipt[] memory result = new Receipt[](count);
        for (uint256 j = 0; j < count; j++) {
            result[j] = temp[j];
        }
        return result;
    }

    function getReceiptsByOwner(
        address owner,
        uint256 startId,
        uint256 limit
    ) external view returns (Receipt[] memory) {
        return _filterReceipts(owner, startId, limit, 0);
    }

    function getReceiptsByCreator(
        address creator,
        uint256 startId,
        uint256 limit
    ) external view returns (Receipt[] memory) {
        return _filterReceipts(creator, startId, limit, 1);
    }

    function getReceiptsByRoyaltyRecipient(
        address recipient,
        uint256 startId,
        uint256 limit
    ) external view returns (Receipt[] memory) {
        return _filterReceipts(recipient, startId, limit, 2);
    }

    function _insertReceipt(string calldata text, address owner) internal returns (uint256) {
        if (bytes(text).length == 0 || bytes(text).length > MAX_TEXT_LENGTH) {
            revert InvalidText();
        }

        bool stampApplies = stampFee > 0 && msg.sender != treasury;
        if (stampApplies) {
            if (msg.value != stampFee) revert WrongFee();
            _safeTransfer(stampFee, treasury);
            totalStampFee += stampFee;
        } else {
            if (msg.value != 0) revert WrongFee();
        }

        uint256 newId = lastId + 1;
        lastId = newId;
        totalSubmissions += 1;

        receipts[newId] = Receipt({
            id: newId,
            creator: msg.sender,
            owner: owner,
            royaltyRecipient: msg.sender,
            text: text,
            createdAt: block.timestamp,
            minted: false
        });

        emit ReceiptSubmitted(newId, msg.sender, owner, msg.sender, block.timestamp);
        return newId;
    }

    function _filterReceipts(
        address target,
        uint256 startId,
        uint256 limit,
        uint8 mode
    ) internal view returns (Receipt[] memory) {
        if (limit == 0 || limit > MAX_PAGE_SIZE) revert InvalidLimit();
        if (startId == 0) startId = 1;
        uint256 end = startId + limit - 1;
        if (end > lastId) {
            end = lastId;
        }

        Receipt[] memory temp = new Receipt[](limit);
        uint256 count = 0;
        for (uint256 i = startId; i <= end; i++) {
            Receipt memory receipt = receipts[i];
            if (receipt.id == 0) continue;
            bool matches = false;
            if (mode == 0 && receipt.owner == target) matches = true;
            if (mode == 1 && receipt.creator == target) matches = true;
            if (mode == 2 && receipt.royaltyRecipient == target) matches = true;
            if (!matches) continue;
            temp[count] = receipt;
            count += 1;
        }

        Receipt[] memory result = new Receipt[](count);
        for (uint256 j = 0; j < count; j++) {
            result[j] = temp[j];
        }
        return result;
    }

    function _safeTransfer(uint256 amount, address to) internal {
        (bool ok, ) = to.call{ value: amount }("");
        require(ok, "Transfer failed");
    }
}
