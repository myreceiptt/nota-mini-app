import path from "node:path";
import dotenv from "dotenv";
import "@nomicfoundation/hardhat-toolbox";

import type { HardhatUserConfig } from "hardhat/config";

dotenv.config({ path: path.resolve(__dirname, ".env.local") });
dotenv.config({ path: path.resolve(__dirname, ".env") });

const accounts =
  process.env.DEPLOYER_PRIVATE_KEY &&
  process.env.DEPLOYER_PRIVATE_KEY.length > 0
    ? [process.env.DEPLOYER_PRIVATE_KEY]
    : [];

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    baseSepolia: {
      url: process.env.BASE_SEPOLIA_RPC_URL ?? "",
      accounts,
      chainId: 84532,
    },
    baseMainnet: {
      url: process.env.BASE_MAINNET_RPC_URL ?? "",
      accounts,
      chainId: 8453,
    },
  },
  etherscan: {
    apiKey: process.env.BASESCAN_API_KEY ?? "",
    customChains: [
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org",
        },
      },
      {
        network: "baseMainnet",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org",
        },
      },
    ],
  },
};

export default config;
