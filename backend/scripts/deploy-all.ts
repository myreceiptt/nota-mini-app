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
  const stampFee = BigInt(requireEnv("STAMP_FEE_WEI"));
  const royaltyFee = BigInt(requireEnv("ROYALTY_FEE_WEI"));
  const mintFee = BigInt(requireEnv("NFT_MINT_FEE_WEI"));
  const royaltyBps = Number(process.env.NFT_ROYALTY_BPS ?? "500");

  const receiptFactory = await ethers.getContractFactory("MyReceiptStamp");
  const receipt = await receiptFactory.deploy(
    deployer.address,
    treasury,
    stampFee,
    royaltyFee
  );
  await receipt.waitForDeployment();
  const receiptAddress = await receipt.getAddress();

  const nftFactory = await ethers.getContractFactory("ReceiptNFT");
  const nft = await nftFactory.deploy(
    deployer.address,
    receiptAddress,
    treasury,
    mintFee,
    royaltyBps
  );
  await nft.waitForDeployment();
  const nftAddress = await nft.getAddress();

  const tx = await receipt.setNftContract(nftAddress);
  await tx.wait();

  await fs.mkdir(deploymentsDir, { recursive: true });
  const file = path.resolve(deploymentsDir, `${network.name}.json`);
  await fs.writeFile(
    file,
    JSON.stringify(
      {
        receipt: receiptAddress,
        nft: nftAddress,
        deployer: deployer.address,
      },
      null,
      2
    )
  );

  console.log("Contracts deployed:", {
    receipt: receiptAddress,
    nft: nftAddress,
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
