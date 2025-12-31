// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IReceiptStamp {
    struct Receipt {
        uint256 id;
        address creator;
        address owner;
        address royaltyRecipient;
        string text;
        uint256 createdAt;
        bool minted;
    }

    function getReceipt(uint256 id) external view returns (Receipt memory);
    function markMinted(uint256 id) external;
}

/// @notice Receipt NFT contract. Only current receipt owner can mint.
/// Royalties go to the NFT creator (minter).
contract ReceiptNFT is ERC721URIStorage, ERC2981, Ownable, ReentrancyGuard {
    IReceiptStamp public receiptContract;
    uint256 public mintFee;
    address public treasury;
    uint96 public royaltyBps;

    error ZeroAddress();
    error WrongFee();
    error NotReceiptOwner();
    error AlreadyMinted();
    error InvalidReceipt();

    event MintFeeUpdated(uint256 oldFee, uint256 newFee);
    event TreasuryUpdated(address indexed oldTreasury, address indexed newTreasury);
    event ReceiptContractUpdated(address indexed oldReceipt, address indexed newReceipt);
    event ReceiptMinted(uint256 indexed receiptId, address indexed minter, uint256 fee);

    constructor(
        address initialOwner,
        address receiptAddress,
        address initialTreasury,
        uint256 initialMintFee,
        uint96 initialRoyaltyBps
    ) ERC721("MyReceipt Stamp NFT", "MYRECEIPT") Ownable(initialOwner) {
        if (receiptAddress == address(0)) revert ZeroAddress();
        if (initialTreasury == address(0)) revert ZeroAddress();

        receiptContract = IReceiptStamp(receiptAddress);
        treasury = initialTreasury;
        mintFee = initialMintFee;
        royaltyBps = initialRoyaltyBps;
    }

    function setMintFee(uint256 newFee) external onlyOwner {
        uint256 old = mintFee;
        mintFee = newFee;
        emit MintFeeUpdated(old, newFee);
    }

    function setTreasury(address newTreasury) external onlyOwner {
        if (newTreasury == address(0)) revert ZeroAddress();
        address old = treasury;
        treasury = newTreasury;
        emit TreasuryUpdated(old, newTreasury);
    }

    function setReceiptContract(address newReceipt) external onlyOwner {
        if (newReceipt == address(0)) revert ZeroAddress();
        address old = address(receiptContract);
        receiptContract = IReceiptStamp(newReceipt);
        emit ReceiptContractUpdated(old, newReceipt);
    }

    function setRoyaltyBps(uint96 newRoyaltyBps) external onlyOwner {
        royaltyBps = newRoyaltyBps;
    }

    function mintFromReceipt(
        uint256 receiptId,
        string calldata tokenURI_
    ) external payable nonReentrant returns (uint256 tokenId) {
        if (msg.value != mintFee) revert WrongFee();

        IReceiptStamp.Receipt memory receipt = receiptContract.getReceipt(receiptId);
        if (receipt.id == 0) revert InvalidReceipt();
        if (receipt.minted) revert AlreadyMinted();
        if (receipt.owner != msg.sender) revert NotReceiptOwner();

        _safeTransfer(mintFee, treasury);

        tokenId = receiptId;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI_);

        _setTokenRoyalty(tokenId, msg.sender, royaltyBps);

        receiptContract.markMinted(receiptId);

        emit ReceiptMinted(receiptId, msg.sender, mintFee);
    }

    function _safeTransfer(uint256 amount, address to) internal {
        (bool ok, ) = to.call{ value: amount }("");
        require(ok, "Transfer failed");
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721URIStorage, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
