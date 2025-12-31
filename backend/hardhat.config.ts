import "dotenv/config";
import "@nomicfoundation/hardhat-toolbox";

import type { HardhatUserConfig } from "hardhat/config";

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
    apiKey: {
      baseSepolia: process.env.BASESCAN_API_KEY ?? "",
      base: process.env.BASESCAN_API_KEY ?? "",
    },
  },
};

export default config;
