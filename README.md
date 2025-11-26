# NOTA Mini App

NOTA Mini App is a small experimental Mini App for the Base app and Farcaster, built by Prof. NOTA as a sandbox for ideas, jokes, and gentle onchain experiments.

The current default example is a simple “NOTA fortune” experience: a lightweight Mini App that can greet the user and surface short reflective lines (“NOTA of the day”) inside the Base app and Farcaster. Over time, this repository can evolve into a playground for more serious NOTA-themed flows.

This project uses:

- **Next.js** (App Router) with TypeScript
- **OnchainKit / MiniKit** for Base integration
- **Farcaster Mini App SDK** for running inside Farcaster clients

---

## Prerequisites

To use and extend this project, you should have:

- A **Base app** account
- A **Farcaster** account
- A **Vercel** account (for hosting)
- A **Coinbase Developer Platform** (CDP) API key for OnchainKit / MiniKit

These are not required just to explore the code locally, but they are needed once you want to ship the Mini App publicly.

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
  A human-readable name that can be shown in the UI.

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`
  Your CDP API key used by OnchainKit / MiniKit to talk to Base.

- `NEXT_PUBLIC_URL`
  The public URL of your deployed app (leave blank while developing locally).

### 4. Run locally

```bash
npm run dev
```

Open your browser and go to:

```text
http://localhost:3000
```

You should see the NOTA Mini App running in your local environment.

---

## Customisation

### Mini App Manifest Configuration

The file `minikit.config.ts` defines the configuration that is used to generate the Mini App manifest at:

```text
app/.well-known/farcaster.json
```

This manifest is read by both Farcaster and the Base app to understand:

- The name and description of your Mini App
- The icons and images to use
- How to display the Mini App as an embed and launchable action

To personalise your NOTA Mini App:

1. Open `minikit.config.ts`.
2. Update fields such as `name`, `subtitle`, and `description`.
3. Put any custom images in the `/public` folder.
4. Update the image URLs in `minikit.config.ts` to point at your assets.

You can skip the `accountAssociation` configuration at first. That step is only needed when you want to cryptographically associate the Mini App domain with your Farcaster account.

---

## Deployment (Vercel)

You can deploy this project using the Vercel CLI or the Vercel dashboard.

### 1. Deploy with Vercel CLI

```bash
vercel --prod
```

After a successful deployment you should get a URL similar to:

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

### 3. Sync environment variables to Vercel

To make sure your production deployment has the same values:

```bash
vercel env add NEXT_PUBLIC_PROJECT_NAME production
vercel env add NEXT_PUBLIC_ONCHAINKIT_API_KEY production
vercel env add NEXT_PUBLIC_URL production
```

Follow the prompts to paste the values from your `.env.local` file.

---

## Account Association with Farcaster

When you are ready to formally associate your NOTA Mini App with your Farcaster account, you can sign the manifest and embed the resulting proof.

### 1. Generate an `accountAssociation` object

1. Navigate to the Farcaster Mini App manifest tool in your browser.
2. Enter your deployed Mini App domain (for example: `your-vercel-project-name.vercel.app`).
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
  frame: {
    // ...rest of your frame / Mini App configuration
  },
};
```

After you commit this change and redeploy, the manifest at `/.well-known/farcaster.json` will include your signed association.

### 3. Redeploy

```bash
vercel --prod
```

This will publish the updated manifest.

---

## Testing and Publishing

### 1. Preview your Mini App

Go to the Base Mini App preview tool in your browser and:

1. Enter your Mini App URL to see how the embed looks and test the launch flow.
2. Use the “Account association” view to confirm that your signed association is valid.
3. Use the “Metadata” view to verify that the title, description, icons, and other fields are set the way you expect.

### 2. Publish to the Base app

To make the NOTA Mini App discoverable inside the Base app:

1. Open the Base app.
2. Create a new post that contains the URL of your Mini App.
3. The Base app should recognise the URL, show the embed, and allow others to launch the Mini App.

---

## Roadmap / Ideas

This repository is intentionally small and opinionated so that it can serve as a playground. Possible future experiments include:

- Alternative NOTA experiences (e.g. “NOTA of the day”, reflections, prompts)
- Simple onchain actions via Base Accounts (minting, stamping, proof-of-presence)
- Small utilities around $myreceipt / other Prof. NOTA narratives

You are free to fork, remix, and repurpose this code for your own experiments.

---

## Disclaimer

This repository started from a public demo template intended for learning how to build Mini Apps for the Base app and Farcaster. It is provided for **educational and experimental purposes only.**

- There is **no official token, cryptocurrency, or investment product** associated with this repository, with NOTA Mini App, or with the examples shown here.
- Any external token, app, or social account claiming to be “officially” tied to Coinbase, Base, or to this demo should be treated with caution and independently verified.
- Never sign transactions or connect wallets to untrusted sites.

For official information about Base and its developer ecosystem, please refer to:

- [https://base.org](https://base.org)
- [https://docs.base.org](https://docs.base.org)

---
