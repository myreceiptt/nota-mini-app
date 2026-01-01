import { ethers, network } from "hardhat";
import fs from "node:fs/promises";
import path from "node:path";

const deploymentsDir = path.resolve(__dirname, "..", "deployments");

const readDeployment = async () => {
  const file = path.resolve(deploymentsDir, `${network.name}.json`);
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw) as { receipt: string };
};

async function main() {
  const { receipt } = await readDeployment();
  const contract = await ethers.getContractAt("MyReceiptStamp", receipt);
  const lastId = await contract.lastId();
  console.log("lastId:", lastId.toString());

  if (lastId > 0n) {
    const latest = await contract.getReceipt(lastId);
    console.log("latest receipt:", {
      id: latest.id.toString(),
      creator: latest.creator,
      owner: latest.owner,
      royaltyRecipient: latest.royaltyRecipient,
      text: latest.text,
      createdAt: latest.createdAt.toString(),
      minted: latest.minted,
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
