// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/// @notice Base on MyReceipt — ERC721 with:
/// - Public payable mint (fee forwarded to treasury)
/// - Adjustable maxSupply (default unlimited)
/// - Global transfer freeze (mint still allowed)
/// - Admin/owner-controlled tokenURI updates (single + batch)
/// - Default tokenURI fallback (Arweave) when empty
/// - EIP-2981 royalties (default + per-token optional)
/// - Burn support (to define currentSupply = totalMinted - totalBurned)
contract BaseOnMyReceipt is
    ERC721URIStorage,
    ERC2981,
    Ownable,
    ReentrancyGuard
{
    // -----------------------
    // Mint config
    // -----------------------
    uint256 public maxSupply; // default: unlimited (type(uint256).max)
    uint256 public biayaMinting; // mint fee in wei
    address public treasuryAddress; // receiver of mint fees

    // -----------------------
    // Freeze config
    // -----------------------
    bool public frozenTransfers; // true => block wallet-to-wallet transfers

    // -----------------------
    // Supply bookkeeping
    // -----------------------
    uint256 private _nextTokenId; // first mint => 1
    uint256 public totalMinted; // lifetime minted count
    uint256 public totalBurned; // lifetime burned count

    // -----------------------
    // Metadata defaults
    // -----------------------
    string public defaultTokenURI; // fallback when mint URI is empty
    string public contractMetadataURI; // contractURI() for marketplaces (optional)

    // -----------------------
    // Events
    // -----------------------
    event TreasuryUpdated(
        address indexed oldTreasury,
        address indexed newTreasury
    );
    event BiayaMintingUpdated(uint256 oldFee, uint256 newFee);
    event MaxSupplyUpdated(uint256 oldMax, uint256 newMax);
    event FrozenTransfersUpdated(bool frozen);

    event DefaultTokenURIUpdated(string oldURI, string newURI);
    event ContractURIUpdated(string oldURI, string newURI);

    event Minted(
        address indexed payer,
        address indexed to,
        uint256 indexed tokenId,
        uint256 fee
    );
    event TokenURIUpdated(uint256 indexed tokenId, string newTokenURI);
    event Burned(address indexed operator, uint256 indexed tokenId);

    // -----------------------
    // Errors (cheaper than revert strings)
    // -----------------------
    error ZeroAddress();
    error MaxSupplyReached();
    error WrongFee();
    error TransfersFrozen();
    error NonexistentToken();
    error LengthMismatch();
    error MaxSupplyTooLow();

    constructor(
        address initialOwner,
        address initialTreasury,
        uint256 initialBiayaMinting,
        address royaltyReceiver,
        uint96 royaltyFeeNumerator,
        string memory initialDefaultTokenURI
    ) ERC721("Base on MyReceipt", "MYRECEIPT") Ownable(initialOwner) {
        if (initialTreasury == address(0)) revert ZeroAddress();
        if (royaltyReceiver == address(0)) revert ZeroAddress();

        treasuryAddress = initialTreasury;
        biayaMinting = initialBiayaMinting;

        maxSupply = type(uint256).max; // unlimited by default
        frozenTransfers = false;

        // Default tokenURI fallback (Arweave link you gave)
        defaultTokenURI = initialDefaultTokenURI;

        // EIP-2981 default royalty
        _setDefaultRoyalty(royaltyReceiver, royaltyFeeNumerator);
    }

    // -----------------------
    // Read helpers
    // -----------------------
    function currentSupply() public view returns (uint256) {
        // by definition: totalMinted - totalBurned
        unchecked {
            return totalMinted - totalBurned;
        }
    }

    /// @notice receiptCap is a "dashboard" helper:
    /// - remainingMintable: lifetime mint slots left (maxSupply - totalMinted)
    /// - remainingCirculating: circulating room left (maxSupply - currentSupply)
    function receiptCap()
        external
        view
        returns (
            uint256 _maxSupply,
            uint256 _totalMinted,
            uint256 _totalBurned,
            uint256 _currentSupply,
            uint256 remainingMintable,
            uint256 remainingCirculating
        )
    {
        _maxSupply = maxSupply;
        _totalMinted = totalMinted;
        _totalBurned = totalBurned;
        _currentSupply = currentSupply();

        if (_maxSupply == type(uint256).max) {
            // "Unlimited" mode — return big sentinel values for UI
            remainingMintable = type(uint256).max;
            remainingCirculating = type(uint256).max;
        } else {
            remainingMintable = _maxSupply - _totalMinted;
            remainingCirculating = _maxSupply - _currentSupply;
        }
    }

    // -----------------------
    // Admin setters (owner-only)
    // -----------------------
    function setTreasuryAddress(address newTreasury) external onlyOwner {
        if (newTreasury == address(0)) revert ZeroAddress();
        address old = treasuryAddress;
        treasuryAddress = newTreasury;
        emit TreasuryUpdated(old, newTreasury);
    }

    function setBiayaMinting(uint256 newFee) external onlyOwner {
        uint256 old = biayaMinting;
        biayaMinting = newFee;
        emit BiayaMintingUpdated(old, newFee);
    }

    /// @dev lifetime mint cap: new maxSupply cannot be below totalMinted
    function setMaxSupply(uint256 newMaxSupply) external onlyOwner {
        if (newMaxSupply < totalMinted) revert MaxSupplyTooLow();
        uint256 old = maxSupply;
        maxSupply = newMaxSupply;
        emit MaxSupplyUpdated(old, newMaxSupply);
    }

    function setFrozenTransfers(bool frozen) external onlyOwner {
        frozenTransfers = frozen;
        emit FrozenTransfersUpdated(frozen);
    }

    function setDefaultTokenURI(
        string calldata newDefaultURI
    ) external onlyOwner {
        string memory old = defaultTokenURI;
        defaultTokenURI = newDefaultURI;
        emit DefaultTokenURIUpdated(old, newDefaultURI);
    }

    function setContractURI(string calldata newContractURI) external onlyOwner {
        string memory old = contractMetadataURI;
        contractMetadataURI = newContractURI;
        emit ContractURIUpdated(old, newContractURI);
    }

    /// @notice Standard marketplace hook (optional but useful)
    function contractURI() external view returns (string memory) {
        return contractMetadataURI;
    }

    // -----------------------
    // Royalties (EIP-2981) — owner-only
    // -----------------------
    function setDefaultRoyalty(
        address receiver,
        uint96 feeNumerator
    ) external onlyOwner {
        if (receiver == address(0)) revert ZeroAddress();
        _setDefaultRoyalty(receiver, feeNumerator);
    }

    function deleteDefaultRoyalty() external onlyOwner {
        _deleteDefaultRoyalty();
    }

    /// @notice Optional: per-token override royalty
    function setTokenRoyalty(
        uint256 tokenId,
        address receiver,
        uint96 feeNumerator
    ) external onlyOwner {
        if (!_exists(tokenId)) revert NonexistentToken();
        if (receiver == address(0)) revert ZeroAddress();
        _setTokenRoyalty(tokenId, receiver, feeNumerator);
    }

    function resetTokenRoyalty(uint256 tokenId) external onlyOwner {
        if (!_exists(tokenId)) revert NonexistentToken();
        _resetTokenRoyalty(tokenId);
    }

    // -----------------------
    // Public payable mint
    // -----------------------
    function mint(
        address to,
        string calldata tokenURI_
    ) external payable nonReentrant returns (uint256 tokenId) {
        if (to == address(0)) revert ZeroAddress();

        // lifetime cap
        if (totalMinted >= maxSupply) revert MaxSupplyReached();

        if (msg.value != biayaMinting) revert WrongFee();

        // determine final URI (fallback allowed)
        string memory finalURI = tokenURI_;
        if (bytes(finalURI).length == 0) {
            finalURI = defaultTokenURI;
        }

        // Effects
        tokenId = ++_nextTokenId;
        totalMinted += 1;

        // Interactions: forward fee to treasury
        (bool ok, ) = treasuryAddress.call{value: msg.value}("");
        require(ok, "Fee transfer failed");

        // Mint + set token URI
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, finalURI);

        emit Minted(msg.sender, to, tokenId, msg.value);
    }

    // -----------------------
    // TokenURI updates (owner-only)
    // -----------------------
    function updateTokenURI(
        uint256 tokenId,
        string calldata newTokenURI
    ) external onlyOwner {
        if (!_exists(tokenId)) revert NonexistentToken();

        string memory finalURI = newTokenURI;
        if (bytes(finalURI).length == 0) {
            finalURI = defaultTokenURI;
        }

        _setTokenURI(tokenId, finalURI);
        emit TokenURIUpdated(tokenId, finalURI);
    }

    function updateTokenURIBatch(
        uint256[] calldata tokenIds,
        string[] calldata newTokenURIs
    ) external onlyOwner {
        if (tokenIds.length != newTokenURIs.length) revert LengthMismatch();

        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            if (!_exists(tokenId)) revert NonexistentToken();

            string memory finalURI = newTokenURIs[i];
            if (bytes(finalURI).length == 0) {
                finalURI = defaultTokenURI;
            }

            _setTokenURI(tokenId, finalURI);
            emit TokenURIUpdated(tokenId, finalURI);
        }
    }

    // -----------------------
    // Burn (public: owner or approved)
    // -----------------------
    function burn(uint256 tokenId) external {
        // ERC721: caller must be owner or approved
        if (!_isApprovedOrOwner(_msgSender(), tokenId))
            revert("Not owner/approved");
        _burn(tokenId); // ERC721URIStorage clears URI storage
        totalBurned += 1;
        emit Burned(_msgSender(), tokenId);
    }

    // -----------------------
    // Freeze transfer logic
    // -----------------------
    /// @dev In OZ v5, ERC721 uses _update() as core hook.
    /// Block only wallet-to-wallet transfers when frozen.
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721URIStorage) returns (address from) {
        from = super._update(to, tokenId, auth);

        // When frozen: block transfers where both from and to are non-zero
        // (mint: from=0; burn: to=0)
        if (frozenTransfers && from != address(0) && to != address(0)) {
            revert TransfersFrozen();
        }
    }

    // -----------------------
    // Overrides
    // -----------------------
    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // Required by Solidity due to multiple inheritance of _burn/tokenURI in URIStorage
    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        if (!_exists(tokenId)) revert NonexistentToken();
        return super.tokenURI(tokenId);
    }
}
