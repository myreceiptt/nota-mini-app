//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////                                                                                                           ///////
////     Our Signature v.4.74                                                                                  ///////
////                                                                                                           ///////
////    *    ##     ######  ######   ######  #######        ###    ##  ######  ########  #####      ##    *    ///////
////    *    ##     ##   ## ##   ## ##    ## ##             ####   ## ##    ##    ##    ##   ##     ##    *    ///////
////    *    ##     ######  ######  ##    ## #####          ## ##  ## ##    ##    ##    #######     ##    *    ///////
////    *           ##      ##   ## ##    ## ##             ##  ## ## ##    ##    ##    ##   ##           *    ///////
////    *    ##     ##      ##   ##  ######  ##      ##     ##   ####  ######     ##    ##   ##     ##    *    ///////
////                                                                                                           ///////
////    ENDHONESA.COM by Prof. NOTA Inc. - Prof. NOTA - @MyReceipt                                             ///////
////    Deep Links: https://deeplink.endhonesa.com/                                                            ///////
////                                                                                                           ///////
////     Regards,                                                                                              ///////
////     Prof. NOTA                                                                                            ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/extensions/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @notice Receipt stamping contract (EVM version).
/// Stores receipt metadata and enforces stamp/royalty fees.
contract MyReceiptStamp is AccessControlEnumerable, ReentrancyGuard {
    bytes32 public constant OWNER_ROLE = DEFAULT_ADMIN_ROLE;
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    uint256 public constant VERSION_MAJOR = 2;
    uint256 public constant VERSION_MINOR = 4;
    uint256 public constant VERSION_PATCH = 0;
    uint256 public constant MAX_SCAN_SIZE = 200;
    uint256 public constant MAX_PAGE_SIZE = 50;
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

    address public treasury;
    address public nftContract;

    uint256 public stampFee;
    uint256 public royaltyFee;
    uint256 public pageSize;

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
    error ScanLimitExceeded();
    error NoOwnersLeft();
    error NotOwnerRole();

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
    event TreasuryUpdated(address indexed previousTreasury, address indexed newTreasury);
    event FeesUpdated(uint256 newStampFee, uint256 newRoyaltyFee);
    event NftContractUpdated(address indexed previousNft, address indexed newNft);
    event VersionInfo(uint256 major, uint256 minor, uint256 patch);

    modifier onlyAdminOrOwner() {
        if (!hasRole(ADMIN_ROLE, msg.sender) && !hasRole(OWNER_ROLE, msg.sender)) {
            revert NotAuthorized();
        }
        _;
    }

    modifier onlyOwnerRole() {
        if (!hasRole(OWNER_ROLE, msg.sender)) revert NotAuthorized();
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
    ) {
        if (initialTreasury == address(0)) revert ZeroAddress();
        treasury = initialTreasury;
        stampFee = initialStampFee;
        royaltyFee = initialRoyaltyFee;
        pageSize = 10;

        _grantRole(OWNER_ROLE, initialOwner);
        _grantRole(ADMIN_ROLE, initialOwner);
        _setRoleAdmin(ADMIN_ROLE, OWNER_ROLE);
    }

    function addOwner(address newOwner) external onlyOwnerRole {
        if (newOwner == address(0)) revert ZeroAddress();
        _grantRole(OWNER_ROLE, newOwner);
    }

    function removeOwner(address ownerToRemove) external onlyOwnerRole {
        if (!hasRole(OWNER_ROLE, ownerToRemove)) revert NotOwnerRole();
        if (getRoleMemberCount(OWNER_ROLE) <= 1) revert NoOwnersLeft();
        _revokeRole(OWNER_ROLE, ownerToRemove);
    }

    function addAdmin(address newAdmin) external onlyOwnerRole {
        if (newAdmin == address(0)) revert ZeroAddress();
        _grantRole(ADMIN_ROLE, newAdmin);
    }

    function removeAdmin(address adminToRemove) external onlyOwnerRole {
        _revokeRole(ADMIN_ROLE, adminToRemove);
    }

    function setTreasury(address newTreasury) external onlyAdminOrOwner {
        if (newTreasury == address(0)) revert ZeroAddress();
        address old = treasury;
        treasury = newTreasury;
        emit TreasuryUpdated(old, newTreasury);
    }

    function setFees(uint256 newStampFee, uint256 newRoyaltyFee) external onlyAdminOrOwner {
        stampFee = newStampFee;
        royaltyFee = newRoyaltyFee;
        emit FeesUpdated(newStampFee, newRoyaltyFee);
    }

    function setNftContract(address newNftContract) external onlyAdminOrOwner {
        if (newNftContract == address(0)) revert ZeroAddress();
        address old = nftContract;
        nftContract = newNftContract;
        emit NftContractUpdated(old, newNftContract);
    }

    function setPageSize(uint256 newSize) external onlyAdminOrOwner {
        if (newSize == 0 || newSize > MAX_PAGE_SIZE) revert InvalidLimit();
        pageSize = newSize;
    }

    function isOwner(address who) public view returns (bool) {
        return hasRole(OWNER_ROLE, who);
    }

    function isAdmin(address who) public view returns (bool) {
        return hasRole(ADMIN_ROLE, who);
    }

    function getOwners() external view returns (address[] memory) {
        uint256 count = getRoleMemberCount(OWNER_ROLE);
        address[] memory owners = new address[](count);
        for (uint256 i = 0; i < count; i++) {
            owners[i] = getRoleMember(OWNER_ROLE, i);
        }
        return owners;
    }

    function getAdmins() external view returns (address[] memory) {
        uint256 count = getRoleMemberCount(ADMIN_ROLE);
        address[] memory admins = new address[](count);
        for (uint256 i = 0; i < count; i++) {
            admins[i] = getRoleMember(ADMIN_ROLE, i);
        }
        return admins;
    }

    function getStampFeeFor(address sender) external view returns (uint256) {
        if (stampFee == 0 || sender == treasury) return 0;
        return stampFee;
    }

    function getRoyaltyFeeFor(uint256 id, address sender) external view returns (uint256) {
        Receipt memory receipt = receipts[id];
        if (receipt.id == 0) revert NotFound();
        if (royaltyFee == 0 || sender == receipt.royaltyRecipient) return 0;
        return royaltyFee;
    }

    function getVersion() external pure returns (uint256, uint256, uint256) {
        return (VERSION_MAJOR, VERSION_MINOR, VERSION_PATCH);
    }

    function getConfig()
        external
        view
        returns (
            address contractOwner,
            address contractAdmin,
            address contractTreasury,
            address contractNft,
            uint256 currentStampFee,
            uint256 currentRoyaltyFee,
            uint256 currentPageSize
        )
    {
        address primaryOwner = address(0);
        address primaryAdmin = address(0);
        if (getRoleMemberCount(OWNER_ROLE) > 0) {
            primaryOwner = getRoleMember(OWNER_ROLE, 0);
        }
        if (getRoleMemberCount(ADMIN_ROLE) > 0) {
            primaryAdmin = getRoleMember(ADMIN_ROLE, 0);
        }
        return (
            primaryOwner,
            primaryAdmin,
            treasury,
            nftContract,
            stampFee,
            royaltyFee,
            pageSize
        );
    }

    function getStats()
        external
        view
        returns (
            uint256 lastReceiptId,
            uint256 submissions,
            uint256 transfers,
            uint256 totalStampFees,
            uint256 totalRoyaltyFees
        )
    {
        return (
            lastId,
            totalSubmissions,
            totalTransfers,
            totalStampFee,
            totalRoyaltyFee
        );
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
        if (limit == 0 || limit > pageSize) revert InvalidLimit();
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

    function getReceiptsRangeDesc(
        uint256 startId,
        uint256 limit
    ) external view returns (Receipt[] memory) {
        if (limit == 0 || limit > pageSize) revert InvalidLimit();
        if (startId == 0 || startId > lastId) startId = lastId;

        Receipt[] memory temp = new Receipt[](limit);
        uint256 count = 0;
        uint256 current = startId;
        while (count < limit && current >= 1) {
            Receipt memory receipt = receipts[current];
            if (receipt.id != 0) {
                temp[count] = receipt;
                count += 1;
            }
            if (current == 1) {
                break;
            }
            current -= 1;
        }

        Receipt[] memory result = new Receipt[](count);
        for (uint256 j = 0; j < count; j++) {
            result[j] = temp[j];
        }
        return result;
    }

    function getReceiptsLatest(uint256 limit) external view returns (Receipt[] memory) {
        return this.getReceiptsRangeDesc(lastId, limit);
    }

    function getReceiptsByOwner(
        address owner,
        uint256 startId,
        uint256 limit
    ) external view returns (Receipt[] memory) {
        return _filterReceipts(owner, startId, limit, 0);
    }

    function getReceiptsByOwnerDesc(
        address owner,
        uint256 startId,
        uint256 limit,
        uint256 maxScan
    ) external view returns (Receipt[] memory, uint256 nextStartId) {
        return _filterReceiptsDesc(owner, startId, limit, maxScan, 0);
    }

    function getReceiptsByCreator(
        address creator,
        uint256 startId,
        uint256 limit
    ) external view returns (Receipt[] memory) {
        return _filterReceipts(creator, startId, limit, 1);
    }

    function getReceiptsByCreatorDesc(
        address creator,
        uint256 startId,
        uint256 limit,
        uint256 maxScan
    ) external view returns (Receipt[] memory, uint256 nextStartId) {
        return _filterReceiptsDesc(creator, startId, limit, maxScan, 1);
    }

    function getReceiptsByRoyaltyRecipient(
        address recipient,
        uint256 startId,
        uint256 limit
    ) external view returns (Receipt[] memory) {
        return _filterReceipts(recipient, startId, limit, 2);
    }

    function getReceiptsByRoyaltyRecipientDesc(
        address recipient,
        uint256 startId,
        uint256 limit,
        uint256 maxScan
    ) external view returns (Receipt[] memory, uint256 nextStartId) {
        return _filterReceiptsDesc(recipient, startId, limit, maxScan, 2);
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
        if (limit == 0 || limit > pageSize) revert InvalidLimit();
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

    function _filterReceiptsDesc(
        address target,
        uint256 startId,
        uint256 limit,
        uint256 maxScan,
        uint8 mode
    ) internal view returns (Receipt[] memory, uint256 nextStartId) {
        if (limit == 0 || limit > pageSize) revert InvalidLimit();
        if (maxScan == 0 || maxScan > MAX_SCAN_SIZE) revert ScanLimitExceeded();
        if (startId == 0 || startId > lastId) startId = lastId;

        Receipt[] memory temp = new Receipt[](limit);
        uint256 count = 0;
        uint256 scanned = 0;
        uint256 current = startId;

        while (count < limit && scanned < maxScan && current >= 1) {
            Receipt memory receipt = receipts[current];
            if (receipt.id != 0) {
                bool matches = false;
                if (mode == 0 && receipt.owner == target) matches = true;
                if (mode == 1 && receipt.creator == target) matches = true;
                if (mode == 2 && receipt.royaltyRecipient == target) matches = true;
                if (matches) {
                    temp[count] = receipt;
                    count += 1;
                }
            }
            scanned += 1;
            if (current == 1) {
                break;
            }
            current -= 1;
        }

        Receipt[] memory result = new Receipt[](count);
        for (uint256 j = 0; j < count; j++) {
            result[j] = temp[j];
        }

        if (current <= 1) {
            nextStartId = 0;
        } else {
            nextStartId = current - 1;
        }

        return (result, nextStartId);
    }

    function _safeTransfer(uint256 amount, address to) internal {
        (bool ok, ) = to.call{ value: amount }("");
        require(ok, "Transfer failed");
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(AccessControlEnumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
