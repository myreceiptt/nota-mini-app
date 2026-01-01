import fs from "node:fs/promises";
import path from "node:path";

const scriptDir = path.dirname(new URL(import.meta.url).pathname);
const receiptDir = path.resolve(scriptDir, "..", "receipt");
const pidFile = process.env.RECEIPT_PID_FILE
  ? path.resolve(process.env.RECEIPT_PID_FILE)
  : path.join(receiptDir, ".stamp.pid");

try {
  const pidRaw = await fs.readFile(pidFile, "utf8");
  const pid = Number(pidRaw.trim());
  if (!pid) throw new Error("PID file is empty.");

  process.kill(pid, "SIGTERM");
  console.log(`Sent SIGTERM to stamp process ${pid}.`);
} catch (err) {
  console.error("Unable to stop stamp process:", err);
  process.exitCode = 1;
}
