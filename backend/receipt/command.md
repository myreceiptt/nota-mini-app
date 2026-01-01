# Backend Commands (MyReceiptStamp + MyReceiptNFTs)

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

## Deploy (Receipt on Mainnet, NFT on Sepolia)

Receipt (mainnet):

```sh
npm run deploy:receipt
```

Receipt (sepolia):

```sh
npm run deploy:receipt:sepolia
```

All (sepolia, testnet):

```sh
npm run deploy:all
```

Deterministic (CREATE2, sepolia):

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
  - NFT scripts run on **Base Sepolia**.

### Sepolia Overrides (Receipt)

```sh
npm run manual:stamp:sepolia
npm run manual:transfer:sepolia
npm run read:receipt:sepolia
```

## Auto Stamp (Mainnet, Private Keys)

### Setup

1. Create your content file:

   ```sh
   cp content.example.json content.json
   ```

2. Create your private key file:

   ```sh
   cp privatekey.example .privatekey.local
   ```

3. Fill `.privatekey.local` with **one private key per line** (0x-prefixed).

Notes:

- Each receipt is stamped by a randomly selected sender key.
- Recipients are randomly chosen from the same key list, excluding the sender.
- If sender == recipient, script forces `submitReceipt` (self), never `submitReceiptFor`.
- Receipt text length must be 1–160 characters.

### Commands (Base Mainnet)

Run one transaction:

```sh
npm run stamp:auto:once
```

Run batch until all content items are stamped (random 47–74s delay between tx; retries every 11s up to 3 times):

```sh
npm run stamp:auto:batch
```

Stop the batch:

```sh
npm run stamp:auto:stop
```

### Optional Env Overrides

- `RECEIPT_CONTENT_FILE` (default `backend/receipt/content.json`)
- `RECEIPT_KEYS_FILE` (default `backend/receipt/.privatekey.local`)
- `RECEIPT_PROGRESS_FILE` (default `backend/receipt/.progress.json`)
- `RECEIPT_PID_FILE` (default `backend/receipt/.stamp.pid`)
- `MIN_STAMP_DELAY_SEC` (default `47`)
- `MAX_STAMP_DELAY_SEC` (default `74`)
- `RETRY_DELAY_SEC` (default `11`)
- `MAX_RETRIES` (default `3`)
