# NOTA Monorepo

This repository is a monorepo with:

- `mini/` — the Mini App (Base app / Farcaster)
- `backend/` — smart contracts, Hardhat scripts, and deterministic deploy tooling

## Quick Start

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
