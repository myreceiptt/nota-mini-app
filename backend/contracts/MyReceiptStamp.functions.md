# MyReceiptStamp — Function Reference

## Constants

- `VERSION_MAJOR/MINOR/PATCH`
  - Purpose: Version info for frontend/admin.
  - Access: Public view.
  - Story: The admin page shows `v1.0.0`.

- `MAX_PAGE_SIZE` (50)
  - Purpose: Hard cap for page size (admin can set lower).
  - Access: Public view.
  - Story: UI enforces 10 receipts per page.

- `MAX_SCAN_SIZE` (200)
  - Purpose: Upper bound for descending scan.
  - Access: Public view.
  - Story: UI uses `maxScan=200` for Load More safety.

## Core Write Functions (public)

- `submitReceipt(text)`
  - Who: Anyone.
  - What: Stamp for self (owner = sender).
  - Story: Amina stamps "Hello" and owns receipt #12.

- `submitReceiptFor(text, recipient)`
  - Who: Anyone.
  - What: Stamp for another address (owner = recipient).
  - Story: Amina stamps for Bima; Bima owns receipt #13.

- `transferReceipt(id, newOwner)`
  - Who: Current owner only.
  - What: Transfer ownership; pays royalty fee if applicable.
  - Story: Bima transfers receipt #13 to Cinta.

- `setReceiptRoyaltyRecipient(id, newRecipient)`
  - Who: Receipt creator only.
  - What: Update royalty recipient for that receipt.
  - Story: Amina sets royalty to her treasury.

## Mint Guard (contract-only)

- `markMinted(id)`
  - Who: Authorized NFT contract only.
  - What: Marks receipt as minted (single NFT per receipt).
  - Story: NFT mint succeeds; contract flips `minted = true`.

## Admin Functions

- `setTreasury(newTreasury)`
  - Who: Admin or Owner.
  - What: Update treasury address.
  - Story: Treasury moved to multisig.

- `setFees(newStampFee, newRoyaltyFee)`
  - Who: Admin or Owner.
  - What: Update stamp/royalty fees.
  - Story: Fees adjusted for campaign.

- `setNftContract(newNftContract)`
  - Who: Admin or Owner.
  - What: Authorize NFT contract to call `markMinted`.
  - Story: Upgraded NFT contract becomes the minter.

- `setPageSize(newSize)`
  - Who: Admin or Owner.
  - What: Update page size (<= MAX_PAGE_SIZE).
  - Story: Admin raises page size to 47.

## Read Helpers

- `getReceipt(id)`
  - Who: Anyone.
  - What: Fetch receipt by ID.
  - Story: UI renders receipt details.

- `getReceiptsRange(startId, limit)`
  - Who: Anyone.
  - What: Ascending range query.
  - Story: Admin list shows IDs 1–10.

- `getReceiptsRangeDesc(startId, limit)`
  - Who: Anyone.
  - What: Descending range query.
  - Story: Feed shows newest receipts first.

- `getReceiptsLatest(limit)`
  - Who: Anyone.
  - What: Latest receipts from `lastId`.
  - Story: Home feed initial load.

- `getReceiptsByOwner(owner, startId, limit)`
  - Who: Anyone.
  - What: Ascending filter by owner.
  - Story: Owned tab load.

- `getReceiptsByCreator(creator, startId, limit)`
  - Who: Anyone.
  - What: Ascending filter by creator.
  - Story: Created tab load.

- `getReceiptsByRoyaltyRecipient(recipient, startId, limit)`
  - Who: Anyone.
  - What: Ascending filter by royalty recipient.
  - Story: Royalty tab load.

## Descending Filtered Paging (new)

- `getReceiptsByOwnerDesc(owner, startId, limit, maxScan)`
- `getReceiptsByCreatorDesc(creator, startId, limit, maxScan)`
- `getReceiptsByRoyaltyRecipientDesc(recipient, startId, limit, maxScan)`
  - Who: Anyone.
  - What: Descending results + cursor for "Load more" without skipping sparse IDs.
  - Story: Amina owns IDs 4,7,11,74; UI starts at `lastId` and scans back to fill page.

## Stats / Config / Version

- `getVersion()`
  - Who: Anyone. Shows version info.

- `getConfig()`
  - Who: Anyone. Shows primary owner/admin + treasury/nftContract/fees/pageSize.

- `getStats()`
  - Who: Anyone. Shows totals and `lastId`.

## Fee Helpers

- `getStampFeeFor(sender)` — returns 0 if sender == treasury or fee == 0.
- `getRoyaltyFeeFor(id, sender)` — returns 0 if sender == royalty recipient or fee == 0.
## Roles

- Owners (multi-owner): `OWNER_ROLE`
  - Can add/remove owners and admins.
  - Can change fees/treasury/NFT contract/page size.
- Admins (multi-admin): `ADMIN_ROLE`
  - Can change fees/treasury/NFT contract/page size.

## Role Management (owner-only)

- `addOwner(address)`
- `removeOwner(address)` (cannot remove last owner)
- `addAdmin(address)`
- `removeAdmin(address)`
- `getOwners()` / `getAdmins()` / `isOwner()` / `isAdmin()`
