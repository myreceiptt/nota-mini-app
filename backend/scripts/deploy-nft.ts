import { ethers, network } from "hardhat";
import fs from "node:fs/promises";
import path from "node:path";

const deploymentsDir = path.resolve(__dirname, "..", "deployments");

const requireEnv = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing ${key} in backend/.env`);
  }
  return value;
};

async function main() {
  const [deployer] = await ethers.getSigners();
  const treasury = requireEnv("TREASURY_ADDRESS");
  const mintFee = BigInt(requireEnv("NFT_MINT_FEE_WEI"));
  const receiptAddress = requireEnv("RECEIPT_CONTRACT_ADDRESS");
  const royaltyBps = Number(process.env.NFT_ROYALTY_BPS ?? "500");

  const nftFactory = await ethers.getContractFactory("ReceiptNFT");
  const nft = await nftFactory.deploy(
    deployer.address,
    receiptAddress,
    treasury,
    mintFee,
    royaltyBps
  );
  await nft.waitForDeployment();

  await fs.mkdir(deploymentsDir, { recursive: true });
  const file = path.resolve(deploymentsDir, `${network.name}.json`);
  await fs.writeFile(
    file,
    JSON.stringify(
      {
        receipt: receiptAddress,
        nft: await nft.getAddress(),
        deployer: deployer.address,
      },
      null,
      2
    )
  );

  console.log("NFT contract deployed:", await nft.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
