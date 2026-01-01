import { ethers, network } from "hardhat";
import fs from "node:fs/promises";
import path from "node:path";

const receiptDir = path.resolve(__dirname, "..", "receipt");
const deploymentsDir = path.resolve(__dirname, "..", "deployments");

const getFilePath = (envKey: string, fallback: string) =>
  process.env[envKey] ? path.resolve(process.env[envKey]!) : fallback;

const contentFile = getFilePath(
  "RECEIPT_CONTENT_FILE",
  path.join(receiptDir, "content.json")
);
const keysFile = getFilePath(
  "RECEIPT_KEYS_FILE",
  path.join(receiptDir, ".privatekey.local")
);
const progressFile = getFilePath(
  "RECEIPT_PROGRESS_FILE",
  path.join(receiptDir, ".progress.json")
);
const pidFile = getFilePath("RECEIPT_PID_FILE", path.join(receiptDir, ".stamp.pid"));

const MIN_DELAY_SEC = Number(process.env.MIN_STAMP_DELAY_SEC ?? 47);
const MAX_DELAY_SEC = Number(process.env.MAX_STAMP_DELAY_SEC ?? 74);
const RETRY_DELAY_SEC = Number(process.env.RETRY_DELAY_SEC ?? 11);
const MAX_RETRIES = Number(process.env.MAX_RETRIES ?? 3);

const readDeployment = async () => {
  const file = path.resolve(deploymentsDir, `${network.name}.json`);
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw) as { receipt: string };
};

const loadKeys = async () => {
  const raw = await fs.readFile(keysFile, "utf8");
  const keys = raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
  if (keys.length === 0) throw new Error("Private key file is empty.");
  return keys;
};

const loadContent = async () => {
  const raw = await fs.readFile(contentFile, "utf8");
  const parsed = JSON.parse(raw) as { items: Array<string | { text: string }> };
  if (!parsed.items || parsed.items.length === 0) {
    throw new Error("content.json has no items.");
  }
  return parsed.items.map((item) =>
    typeof item === "string" ? item : item.text
  );
};

const loadProgress = async () => {
  try {
    const raw = await fs.readFile(progressFile, "utf8");
    const parsed = JSON.parse(raw) as { index?: number };
    return Number(parsed.index ?? 0);
  } catch (err) {
    return 0;
  }
};

const saveProgress = async (index: number) => {
  await fs.writeFile(progressFile, JSON.stringify({ index }, null, 2));
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const pickIndex = (count: number) => Math.floor(Math.random() * count);

const enforceTextLength = (text: string) => {
  const length = Buffer.byteLength(text, "utf8");
  if (length === 0 || length > 160) {
    throw new Error(`Receipt text length ${length} is invalid (1-160).`);
  }
};

const writePid = async () => {
  await fs.writeFile(pidFile, String(process.pid));
};

const clearPid = async () => {
  try {
    await fs.unlink(pidFile);
  } catch (err) {
    // ignore
  }
};

async function stampOnce(
  receiptAddress: string,
  keys: string[],
  text: string
) {
  const senderIndex = pickIndex(keys.length);
  let recipientIndex = pickIndex(keys.length);
  while (recipientIndex === senderIndex && keys.length > 1) {
    recipientIndex = pickIndex(keys.length);
  }

  const sender = new ethers.Wallet(keys[senderIndex], ethers.provider);
  const recipient = new ethers.Wallet(keys[recipientIndex], ethers.provider);

  const contractRead = await ethers.getContractAt("MyReceiptStamp", receiptAddress);
  const stampFee: bigint = await contractRead.stampFee();
  const treasury: string = await contractRead.treasury();

  const value =
    stampFee > 0n && sender.address.toLowerCase() !== treasury.toLowerCase()
      ? stampFee
      : 0n;

  enforceTextLength(text);

  const useGift = Math.random() < 0.5;
  const contract = await ethers.getContractAt("MyReceiptStamp", receiptAddress, sender);

  const tx = useGift && recipient.address !== sender.address
    ? await contract.submitReceiptFor(text, recipient.address, { value })
    : await contract.submitReceipt(text, { value });

  const receiptTx = await tx.wait();
  const mode = useGift && recipient.address !== sender.address ? "gift" : "self";

  return {
    txHash: receiptTx?.hash,
    sender: sender.address,
    recipient: mode === "gift" ? recipient.address : "(self)",
    mode,
  };
}

async function main() {
  const { receipt } = await readDeployment();
  const keys = await loadKeys();
  const items = await loadContent();

  let index = await loadProgress();
  if (index >= items.length) {
    console.log("All receipts already stamped.");
    return;
  }

  await writePid();

  try {
    while (index < items.length) {
      const text = items[index];
      let attempt = 0;
      let success = false;

      while (!success && attempt < MAX_RETRIES) {
        try {
          const result = await stampOnce(receipt, keys, text);
          console.log("Stamp submitted:", {
            receipt,
            txHash: result.txHash,
            sender: result.sender,
            recipient: result.recipient,
            mode: result.mode,
            contentIndex: index,
          });
          success = true;
        } catch (err) {
          attempt += 1;
          console.error(`Stamp attempt ${attempt} failed:`, err);
          if (attempt < MAX_RETRIES) {
            await sleep(RETRY_DELAY_SEC * 1000);
          }
        }
      }

      if (!success) {
        throw new Error("Stamping failed after max retries.");
      }

      index += 1;
      await saveProgress(index);

      if (index >= items.length) break;

      const delay = randomBetween(MIN_DELAY_SEC, MAX_DELAY_SEC);
      console.log(`Waiting ${delay} seconds before next stamp...`);
      await sleep(delay * 1000);
    }

    console.log("Batch complete. All receipts stamped.");
  } finally {
    await clearPid();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
