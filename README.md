# $MyReceipt of Life

This repository is a monorepo with:

- `backend/` — smart contracts, Hardhat scripts, and deterministic deploy tooling
- `mini/` — the Mini App (Base app / Farcaster)
- `web/` - soon

## Quick Start

### Web App

```sh
cd web
npm install
npm run dev
```

### Mini App

```sh
cd mini
npm install
npm run dev
```

### Backend (Hardhat)

```sh
cd backend
npm install
cp .env.example .env
```

Then set RPC URLs and keys in `backend/.env`.

## Deterministic Deploy (CREATE2)

The backend uses a CREATE2 factory for deterministic deployment. Configure:

- `CREATE2_FACTORY_ADDRESS`
- `CREATE2_SALT`

Then run:

```sh
cd backend
npm run deploy:deterministic -- --network baseSepolia
```

---
---

## Maintenance by Prof. NOTA Evergreen Standard (mini/)

This repo is intended to stay evergreen while remaining production-safe.

### Runtime

- Node: **24.x** (see `mini/.nvmrc` and `mini/package.json#engines`)

  - ~~example alternatives: 22.x / 20.x (adjust if platform requires)~~

- Package manager:

  - **NPM** (lockfile: `mini/package-lock.json`)
  - ~~Yarn (lockfile: `yarn.lock`)~~
  - ~~PNPM (lockfile: `pnpm-lock.yaml`)~~

- Deploy target:

  - **Vercel**
  - ~~Netlify~~
  - ~~Self-hosted / Docker~~
  - ~~Other platform (document explicitly)~~

### Monthly Safe Updates (recommended)

1. Check what’s outdated:

   - `npm outdated`
   - ~~yarn outdated~~
   - ~~pnpm outdated~~

2. Upgrade safe (patch/minor) versions:

   - `npm update`
   - or upgrade specific packages shown as non-major

3. Verify:

   - `npm audit --audit-level=moderate`
   - ~~yarn audit~~
   - ~~pnpm audit~~
   - `npm run build`
   - ~~yarn build~~
   - ~~pnpm build~~

4. Deploy:

   - **Vercel auto-deploy from `main`**
   - ~~manual deploy according to platform workflow~~

### Major Updates (quarterly / scheduled)

Major upgrades (framework, runtime, or core tooling) must be done one at a time,
with a dedicated PR and full testing.

Examples:

- Node major version
- Next.js / React major version
- Tailwind CSS major version
- Package manager major version

---
---

## Maintenance by Prof. NOTA Evergreen Standard (backend/)

This repo is a **Support/Test Workspace** (no deployable app). It must stay evergreen so tests/scripts remain reliable.

### Runtime

- Node: **24.x** (see `backend/.nvmrc` and `backend/package.json#engines`)

  - ~~example alternatives: 22.x / 20.x (adjust if platform requires)~~

- Package manager:

  - **NPM** (lockfile: `backend/package-lock.json`)
  - ~~Yarn (lockfile: `yarn.lock`)~~
  - ~~PNPM (lockfile: `pnpm-lock.yaml`)~~

- Deploy target: **None (tests/tooling only)**

### Monthly Safe Updates (recommended)

1. Check what’s outdated:

   - `npm outdated`
   - ~~yarn outdated~~
   - ~~pnpm outdated~~

2. Upgrade safe (patch/minor) versions:

   - `npm update`
   - or upgrade specific packages shown as non-major

3. Verify:

   - `npm audit --audit-level=moderate`
   - ~~yarn audit~~
   - ~~pnpm audit~~

4. Tests:

   - `npm test`

5. Build/deploy:

   - Not applicable (no build/deploy step)

### Major Updates (quarterly / scheduled)

Major upgrades (runtime/tooling) must be done one at a time, with a dedicated PR and full testing.

Examples:

- Node major version
- Test runner/tooling major version (e.g., Vitest/Jest)
- SDK major (e.g., Hardhat)

---
---

## Evergreen Notes

- `mini/` stays on `wagmi@2.x` because `@coinbase/onchainkit@1.1.2` requires `wagmi@^2.16`.
- `mini/` stays on `typescript@5.8.3` because `@farcaster/quick-auth@0.0.8` peers `5.8.3`.
- `backend/` stays on `hardhat@2.x` until a dedicated Hardhat 3 migration is scheduled.
