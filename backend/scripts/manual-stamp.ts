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
  const text = requireEnv("RECEIPT_TEXT");
  const recipient = process.env.RECEIPT_RECIPIENT;

  const contract = await ethers.getContractAt("MyReceiptStamp", receipt);
  const stampFee = await contract.stampFee();
  const treasury = await contract.treasury();
  const sender = (await ethers.getSigners())[0].address;
  const value =
    stampFee > 0n && treasury.toLowerCase() !== sender.toLowerCase()
      ? stampFee
      : 0n;

  const tx = recipient
    ? await contract.submitReceiptFor(text, recipient, { value })
    : await contract.submitReceipt(text, { value });

  const receiptTx = await tx.wait();
  console.log("Stamp submitted:", {
    receipt,
    txHash: receiptTx?.hash,
    recipient: recipient ?? "(self)",
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
