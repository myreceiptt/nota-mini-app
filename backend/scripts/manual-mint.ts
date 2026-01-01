import { ethers, network } from "hardhat";
import fs from "node:fs/promises";
import path from "node:path";

const deploymentsDir = path.resolve(__dirname, "..", "deployments");

const requireEnv = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing ${key} in backend/.env.local`);
  }
  return value;
};

const readDeployment = async () => {
  const file = path.resolve(deploymentsDir, `${network.name}.json`);
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw) as { nft: string };
};

async function main() {
  const { nft } = await readDeployment();
  const receiptId = Number(requireEnv("RECEIPT_ID"));
  const tokenUri = requireEnv("TOKEN_URI");

  const contract = await ethers.getContractAt("ReceiptNFT", nft);
  const mintFee = await contract.mintFee();

  const tx = await contract.mintFromReceipt(receiptId, tokenUri, {
    value: mintFee,
  });
  const receiptTx = await tx.wait();
  console.log("NFT minted:", {
    nft,
    receiptId,
    txHash: receiptTx?.hash,
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
