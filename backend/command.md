# Backend Commands (MyReceiptStamp + ReceiptNFT)

Run all commands from `backend/`.

## Environment Setup

```sh
cp .env.example .env.local
```

Required keys in `backend/.env.local`:

- `BASE_SEPOLIA_RPC_URL`
- `BASE_MAINNET_RPC_URL`
- `DEPLOYER_PRIVATE_KEY`
- `TREASURY_ADDRESS`
- `STAMP_FEE_WEI`
- `ROYALTY_FEE_WEI`
- `NFT_MINT_FEE_WEI`
- `NFT_ROYALTY_BPS`

## Deploy (Sepolia)

Non-deterministic (testnet):

```sh
npm run deploy:all
```

Deterministic (CREATE2, optional):

```sh
npm run deploy:deterministic
```

## Read Latest Receipt

```sh
npm run read:receipt
```

## Manual Stamp

Self-stamp:

```sh
RECEIPT_TEXT="Hello world" npm run manual:stamp
```

Stamp for someone else:

```sh
RECEIPT_TEXT="Gifted receipt" RECEIPT_RECIPIENT=0x... npm run manual:stamp
```

## Manual Transfer (Receipt)

```sh
RECEIPT_ID=1 TRANSFER_TO=0x... npm run manual:transfer
```

## Manual Mint (NFT)

```sh
RECEIPT_ID=1 TOKEN_URI="data:application/json;base64,..." npm run manual:mint
```

Notes:

- `TOKEN_URI` must be a full data URI (base64 JSON).
- Minting only works if the receipt is stamped and not already minted.
- Minting is allowed only for the current receipt owner.
