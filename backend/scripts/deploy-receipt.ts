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

  const receiptFactory = await ethers.getContractFactory("MyReceiptStamp");
  const receipt = await receiptFactory.deploy(
    deployer.address,
    treasury,
    stampFee,
    royaltyFee
  );
  await receipt.waitForDeployment();

  await fs.mkdir(deploymentsDir, { recursive: true });
  const file = path.resolve(deploymentsDir, `${network.name}.json`);
  await fs.writeFile(
    file,
    JSON.stringify(
      {
        receipt: await receipt.getAddress(),
        deployer: deployer.address,
      },
      null,
      2
    )
  );

  console.log("Receipt contract deployed:", await receipt.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
