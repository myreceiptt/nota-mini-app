# MyReceipt Mini App (NOTA Mini App)

**MyReceipt Mini App** (a.k.a. **NOTA Mini App**) is an experimental Mini App for the **Base app** and **Farcaster**, built by Prof. NOTA as a sandbox for playful and reflective onchain experiences.

It takes the NOTA concept and turns it into:

> **“Your onchain receipt of today.”**

The current default experience is a simple **“NOTA fortune”** flow:

- A user opens the Mini App inside the Base app or a Farcaster client.
- The Mini App reads MiniKit context (including `displayName` / `username`).
- The app generates a short “NOTA of the day” line from a curated template list.
- That line is rendered as a **visual receipt card** (1074×1474 canvas) — a “living receipt” of the moment.
- The user can:
  - Get another receipt,
  - Download the receipt image,
  - Create a cast on Farcaster,
  - Save / pin the Mini App.

This repository is intentionally small and opinionated so that it can serve as a **playground for NOTA / MyReceipt flows** maintained by Prof. NOTA and Prof. NOTA Inc.:

- Personalised NOTA content,
- Per-user receipt history,
- Eventual onchain integrations on Base (minting, stamping, proofs).

---

## Tech Stack

- **Next.js 15** (App Router) with TypeScript
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
- **CSS Modules + global styles**:
  - `app/page.module.css`, `app/success/page.module.css`, `app/globals.css`

---

## Project Structure

High-level layout of the app:

```text
app/
  layout.tsx                 # Root layout, SafeArea, OnchainKit RootProvider
  rootProvider.tsx           # OnchainKitProvider for Base + MiniKit config
  page.tsx                   # Main "MyReceipt of Today" experience
  page.module.css            # Styles for the main page (card, buttons, layout)
  globals.css                # Global styles

  success/
    page.tsx                 # "Success" page (e.g. after Base app flows)
    page.module.css          # Styles for the success page

  api/
    webhook/route.ts         # Base Mini App webhook (currently logs events)
    receipt/route.tsx        # Image generator for receipts (next/og)
    auth/route.ts            # Farcaster JWT verification endpoint (quick-auth)

  .well-known/
    farcaster.json/route.ts  # Farcaster Mini App manifest generator

minikit.config.ts            # Source-of-truth Mini App config for Base/Farcaster
public/                      # Static assets (icons, hero images, etc.)
```

---

### Main user flow (current version)

1. The user opens MyReceipt inside the Base app or a Farcaster client.
2. `app/layout.tsx` wraps the tree with:

   - `RootProvider` (OnchainKitProvider for Base + MiniKit)
   - `SafeArea` (MiniKit utility for in-frame rendering)

3. `app/page.tsx`:

   - Reads user context via `useMiniKit` (e.g. `displayName`, `username`)
   - Picks a template from `receiptTemplates.ts` using `generateReceipt(displayName)`
   - Renders the NOTA text into a 1074×1474 `<canvas>` (the “receipt card”)
   - Converts the canvas into a `data:` URL for download
   - Provides actions:

     - Get another receipt (refresh the NOTA text),
     - Download the card,
     - Save/pin the Mini App (`useAddFrame`),
     - Share as a cast (`useComposeCast`).

4. `/api/receipt` exposes an alternative “server-side receipt image” endpoint.
5. `/api/webhook` is wired for Base Mini App webhooks and can be extended to log metrics or events.

---

## Prerequisites

To use and extend this project the way it was designed, you’ll eventually want:

- A **Base app** account
- A **Farcaster** account
- A **Vercel** account (for hosting)
- A **Coinbase Developer Platform (CDP)** API key for OnchainKit / MiniKit

These are **not required** just to explore the code locally, but are needed if you want to ship the Mini App publicly inside Base and Farcaster.

---

## Getting Started (Local Development)

### 1. Clone this repository

```bash
git clone https://github.com/myreceiptt/nota-mini-app.git
cd nota-mini-app
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
```

### 3. Configure environment variables

Use the provided `.example.env` file as a reference and create a new `.env.local` file in the project root:

```bash
cp .example.env .env.local
```

Then edit `.env.local` and set the values that apply to you:

```bash
NEXT_PUBLIC_PROJECT_NAME="NOTA Mini App"
NEXT_PUBLIC_ONCHAINKIT_API_KEY=<REPLACE_WITH_YOUR_CDP_API_KEY>
NEXT_PUBLIC_URL=
```

- `NEXT_PUBLIC_PROJECT_NAME`
  Human-readable project name shown in the UI and/or metadata.

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`
  Your CDP API key used by OnchainKit / MiniKit to talk to Base.

- `NEXT_PUBLIC_URL`
  The public URL of your deployed app (keep this empty while developing locally).

The code may also rely on Vercel-injected environment variables during deployment:

- `VERCEL_ENV`
- `VERCEL_PROJECT_PRODUCTION_URL`
- `VERCEL_URL`

These are set automatically by Vercel and usually don’t need to be added manually for local development.

### 4. Run locally

```bash
npm run dev
# or
pnpm dev
```

Open your browser and go to:

```text
http://localhost:3000
```

You should see the MyReceipt / NOTA Mini App running in your local environment.

> Note: Some MiniKit features that depend on host context (Base app / Farcaster) will only function fully when the app is embedded as a Mini App in a compatible client.

---

## Mini App Manifest Configuration

The file `minikit.config.ts` defines the configuration that is used to generate the Mini App manifest at:

```text
app/.well-known/farcaster.json
```

This manifest is read by both Farcaster and the Base app to understand:

- The name and description of your Mini App
- Icons and images to use
- How to display the Mini App as an embed and as a launchable action
- Webhook configuration (e.g. `webhookUrl` pointing to `/api/webhook`)

To personalise your NOTA / MyReceipt Mini App:

1. Open `minikit.config.ts`.
2. Update fields such as:

   - `name`,
   - `subtitle`,
   - `description`,
   - `tags`,
   - image URLs (hero image, icon, etc.).

3. Put any custom images in the `/public` folder.
4. Update the image URLs in `minikit.config.ts` to point to your assets.

You can skip the `accountAssociation` configuration at first. That step is only needed when you want to **cryptographically associate** the Mini App domain with your Farcaster account.

---

## Deployment (Vercel)

You can deploy this project using the Vercel CLI or the Vercel dashboard.

### 1. Deploy with Vercel CLI

```bash
vercel --prod
```

After a successful deployment, you should get a URL similar to:

```text
https://your-vercel-project-name.vercel.app/
```

### 2. Update local environment variables

Once you have a production URL, add it to `.env.local`:

```bash
NEXT_PUBLIC_PROJECT_NAME="NOTA Mini App"
NEXT_PUBLIC_ONCHAINKIT_API_KEY=<REPLACE_WITH_YOUR_CDP_API_KEY>
NEXT_PUBLIC_URL=https://your-vercel-project-name.vercel.app/
```

If you have a custom domain (for example `https://mini.endhonesa.com`), use that as `NEXT_PUBLIC_URL` instead.

### 3. Sync environment variables to Vercel

To ensure your production deployment has the same values:

```bash
vercel env add NEXT_PUBLIC_PROJECT_NAME production
vercel env add NEXT_PUBLIC_ONCHAINKIT_API_KEY production
vercel env add NEXT_PUBLIC_URL production
```

Follow the prompts to paste the values from your `.env.local` file.

---

## Account Association with Farcaster

When you are ready to formally associate your NOTA / MyReceipt Mini App with your Farcaster account, you can sign the manifest and embed the resulting proof.

### 1. Generate an `accountAssociation` object

1. Navigate to the Farcaster Mini App manifest tool in your browser.
2. Enter your deployed Mini App domain (for example: `mini.endhonesa.com` or your Vercel URL).
3. Use your Farcaster wallet to sign the manifest as instructed.
4. Copy the generated `accountAssociation` object (it contains `header`, `payload`, and `signature` fields).

### 2. Update `minikit.config.ts`

In `minikit.config.ts`, include the object you copied:

```ts
export const minikitConfig = {
  accountAssociation: {
    header: "your-header-here",
    payload: "your-payload-here",
    signature: "your-signature-here",
  },
  miniapp: {
    // ...rest of your Mini App configuration
  },
};
```

After you commit this change and redeploy, the manifest at `/.well-known/farcaster.json` will include your signed association.

### 3. Redeploy

```bash
vercel --prod
```

This will publish the updated manifest and associated proof.

---

## Roadmap / Ideas

This repository is intended as a living playground for NOTA-themed experiments by Prof. NOTA and Prof. NOTA Inc. Some natural next steps include:

- **Alternative NOTA / MyReceipt experiences**

  - “NOTA of the day”
  - Reflection prompts
  - User-authored receipts (“My receipt of today is…”)

- **Personalisation**

  - Allow users to append or fully author their own MyReceipt text
  - Different “modes” (random template vs. custom-first)

- **Receipt history (offchain)**

  - Store per-user receipt logs keyed by Farcaster `fid`
  - Surface recent receipts as a personal timeline or “ledger”

- **Webhook + metrics**

  - Use `/api/webhook` to log Base Mini App events (e.g. saves, launches)
  - Simple dashboards / stats around MyReceipt usage

- **Onchain hooks (Base)**

  - Mint or “stamp” a MyReceipt as an onchain artefact
  - Proof-of-presence / proof-of-reflection flows
  - Tiny utilities around **$myreceipt** or other Prof. NOTA narratives (purely experimental, non-financial)

Any actual use, remix, or redistribution of this codebase must follow the terms described in the `LICENSE` file. If you are interested in collaborations or specific permissions, please refer to the contact information in `LICENSE`.

---

## Disclaimer

This repository started from a public demo template intended for learning how to build Mini Apps for the Base app and Farcaster. It is provided for **educational and experimental purposes** within the boundaries defined in the `LICENSE` file.

- There is **no official token, cryptocurrency, or investment product** associated with this repository, with NOTA Mini App / MyReceipt Mini App, or with the examples shown here.
- Any external token, app, or social account claiming to be “officially” tied to Coinbase, Base, or to this demo should be treated with caution and independently verified.
- Never sign transactions or connect wallets to untrusted sites.

License, permitted uses, and restrictions are defined in the `LICENSE` file at the root of this repository. For official information about Base and its developer ecosystem, please refer to:

- [https://base.org](https://base.org)
- [https://docs.base.org](https://docs.base.org)

---
