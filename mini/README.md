# $MyReceipt of Life - $MyReceipt Mini App

**$MyReceipt of Life - $MyReceipt Mini App** starting from an experimental Mini App for the **Base app** and **Farcaster**, and an experimental Web App on the **Stacks blockchain**, built by Prof. NOTA as a sandbox for playful and reflective onchain experiences.

It takes the receipt concept and turns it into:

> NOTA = receipt | note  
> **A tiny on-chain receipt that can move, earn royalties, and tell a story.**

The current default experience is a simple **“$MyReceipt fortune”** flow:

- A user opens the Mini App inside the **Base app** or a **Farcaster client**.
- The Mini App reads MiniKit context (including `displayName` / `username`).
- A user writes and stamps a statement as a receipt, either for themselves or as a gift to someone.
- When stamped, a transaction is submitted to the **MyReceiptStamp** contract on Base mainnet.
- That receipt is rendered as a **visual receipt card** (1074×1474 canvas) — a “living receipt” of the moment.
- The user can:
  - Download the receipt image,
  - Share the receipt on the Base app or Farcaster client.
- The owner of the receipt can:
  - Mint an NFT for the receipt.
  - Transfer the receipt to someone.
- When an NFT is minted, a transaction is submitted to the **MyReceiptNFTs** contract on Base mainnet.
- Each time an NFT is successfully minted, the **MyReceiptNFTs** contract sets the receipt as minted in the **MyReceiptStamp** contract.
- When the receipt is transferred, a royalty will be paid to the receipt's royalty recipient.
- When the NFT is sold, a royalty will be paid to the NFT minter, if supported by the marketplace.

---

## Tech Stack

- **Next.js 16** (App Router, `app/` directory) with TypeScript
- **OnchainKit / MiniKit** from Coinbase:
  - `OnchainKitProvider` as the root provider (Base chain)
  - `SafeArea`, `useMiniKit`, `useComposeCast`, `useAddFrame` for Mini App integration
- **Farcaster Mini App manifest**:
  - `minikit.config.ts` + `app/.well-known/farcaster.json/route.ts`
- **Farcaster Mini App SDK / MiniKit runtime** for running in Farcaster clients & Base app
- **`next/og`**:
  - `/api/receipt` for generating image-based receipts
- **`@farcaster/quick-auth`**:
  - `/api/auth` to verify Farcaster JWTs when needed
- **Styling**:
  - Tailwind CSS (global styles in `app/globals.css`)

---

---
