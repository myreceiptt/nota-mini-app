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
  return JSON.parse(raw) as { receipt: string };
};

async function main() {
  const { receipt } = await readDeployment();
  const receiptId = Number(requireEnv("RECEIPT_ID"));
  const newOwner = requireEnv("TRANSFER_TO");

  const contract = await ethers.getContractAt("MyReceiptStamp", receipt);
  const royaltyFee = await contract.royaltyFee();
  const current = await contract.getReceipt(receiptId);
  const sender = (await ethers.getSigners())[0].address;

  const royaltyApplies =
    royaltyFee > 0n && current.royaltyRecipient.toLowerCase() !== sender.toLowerCase();
  const value = royaltyApplies ? royaltyFee : 0n;

  const tx = await contract.transferReceipt(receiptId, newOwner, { value });
  const receiptTx = await tx.wait();
  console.log("Receipt transferred:", {
    receipt,
    receiptId,
    to: newOwner,
    txHash: receiptTx?.hash,
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
