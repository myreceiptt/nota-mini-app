"use client";

import {
  createPublicClient,
  createWalletClient,
  custom,
  http,
  type Address,
} from "viem";
import { base } from "viem/chains";

export const CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_RECEIPT_CONTRACT_ADDRESS as Address | undefined;

const RPC_URL =
  process.env.NEXT_PUBLIC_BASE_RPC_URL || "https://base.rpc.thirdweb.com";

const receiptStampAbi = [
  {
    type: "function",
    name: "getConfig",
    stateMutability: "view",
    inputs: [],
    outputs: [
      { name: "contractOwner", type: "address" },
      { name: "contractAdmin", type: "address" },
      { name: "contractTreasury", type: "address" },
      { name: "contractNft", type: "address" },
      { name: "currentStampFee", type: "uint256" },
      { name: "currentRoyaltyFee", type: "uint256" },
      { name: "currentPageSize", type: "uint256" },
    ],
  },
  {
    type: "function",
    name: "getStats",
    stateMutability: "view",
    inputs: [],
    outputs: [
      { name: "lastReceiptId", type: "uint256" },
      { name: "submissions", type: "uint256" },
      { name: "transfers", type: "uint256" },
      { name: "totalStampFees", type: "uint256" },
      { name: "totalRoyaltyFees", type: "uint256" },
    ],
  },
  {
    type: "function",
    name: "getVersion",
    stateMutability: "pure",
    inputs: [],
    outputs: [
      { name: "major", type: "uint256" },
      { name: "minor", type: "uint256" },
      { name: "patch", type: "uint256" },
    ],
  },
  {
    type: "function",
    name: "getReceipt",
    stateMutability: "view",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: [
      {
        name: "receipt",
        type: "tuple",
        components: [
          { name: "id", type: "uint256" },
          { name: "creator", type: "address" },
          { name: "owner", type: "address" },
          { name: "royaltyRecipient", type: "address" },
          { name: "text", type: "string" },
          { name: "createdAt", type: "uint256" },
          { name: "minted", type: "bool" },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "getReceiptsLatest",
    stateMutability: "view",
    inputs: [{ name: "limit", type: "uint256" }],
    outputs: [
      {
        name: "receipts",
        type: "tuple[]",
        components: [
          { name: "id", type: "uint256" },
          { name: "creator", type: "address" },
          { name: "owner", type: "address" },
          { name: "royaltyRecipient", type: "address" },
          { name: "text", type: "string" },
          { name: "createdAt", type: "uint256" },
          { name: "minted", type: "bool" },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "getReceiptsRangeDesc",
    stateMutability: "view",
    inputs: [
      { name: "startId", type: "uint256" },
      { name: "limit", type: "uint256" },
    ],
    outputs: [
      {
        name: "receipts",
        type: "tuple[]",
        components: [
          { name: "id", type: "uint256" },
          { name: "creator", type: "address" },
          { name: "owner", type: "address" },
          { name: "royaltyRecipient", type: "address" },
          { name: "text", type: "string" },
          { name: "createdAt", type: "uint256" },
          { name: "minted", type: "bool" },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "getReceiptsByOwnerDesc",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "startId", type: "uint256" },
      { name: "limit", type: "uint256" },
      { name: "maxScan", type: "uint256" },
    ],
    outputs: [
      {
        name: "receipts",
        type: "tuple[]",
        components: [
          { name: "id", type: "uint256" },
          { name: "creator", type: "address" },
          { name: "owner", type: "address" },
          { name: "royaltyRecipient", type: "address" },
          { name: "text", type: "string" },
          { name: "createdAt", type: "uint256" },
          { name: "minted", type: "bool" },
        ],
      },
      { name: "nextStartId", type: "uint256" },
    ],
  },
  {
    type: "function",
    name: "getReceiptsByCreatorDesc",
    stateMutability: "view",
    inputs: [
      { name: "creator", type: "address" },
      { name: "startId", type: "uint256" },
      { name: "limit", type: "uint256" },
      { name: "maxScan", type: "uint256" },
    ],
    outputs: [
      {
        name: "receipts",
        type: "tuple[]",
        components: [
          { name: "id", type: "uint256" },
          { name: "creator", type: "address" },
          { name: "owner", type: "address" },
          { name: "royaltyRecipient", type: "address" },
          { name: "text", type: "string" },
          { name: "createdAt", type: "uint256" },
          { name: "minted", type: "bool" },
        ],
      },
      { name: "nextStartId", type: "uint256" },
    ],
  },
  {
    type: "function",
    name: "getReceiptsByRoyaltyRecipientDesc",
    stateMutability: "view",
    inputs: [
      { name: "recipient", type: "address" },
      { name: "startId", type: "uint256" },
      { name: "limit", type: "uint256" },
      { name: "maxScan", type: "uint256" },
    ],
    outputs: [
      {
        name: "receipts",
        type: "tuple[]",
        components: [
          { name: "id", type: "uint256" },
          { name: "creator", type: "address" },
          { name: "owner", type: "address" },
          { name: "royaltyRecipient", type: "address" },
          { name: "text", type: "string" },
          { name: "createdAt", type: "uint256" },
          { name: "minted", type: "bool" },
        ],
      },
      { name: "nextStartId", type: "uint256" },
    ],
  },
  {
    type: "function",
    name: "getStampFeeFor",
    stateMutability: "view",
    inputs: [{ name: "sender", type: "address" }],
    outputs: [{ name: "fee", type: "uint256" }],
  },
  {
    type: "function",
    name: "getRoyaltyFeeFor",
    stateMutability: "view",
    inputs: [
      { name: "id", type: "uint256" },
      { name: "sender", type: "address" },
    ],
    outputs: [{ name: "fee", type: "uint256" }],
  },
  {
    type: "function",
    name: "submitReceipt",
    stateMutability: "payable",
    inputs: [{ name: "text", type: "string" }],
    outputs: [{ name: "receiptId", type: "uint256" }],
  },
  {
    type: "function",
    name: "submitReceiptFor",
    stateMutability: "payable",
    inputs: [
      { name: "text", type: "string" },
      { name: "recipient", type: "address" },
    ],
    outputs: [{ name: "receiptId", type: "uint256" }],
  },
  {
    type: "function",
    name: "transferReceipt",
    stateMutability: "payable",
    inputs: [
      { name: "id", type: "uint256" },
      { name: "newOwner", type: "address" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "setReceiptRoyaltyRecipient",
    stateMutability: "nonpayable",
    inputs: [
      { name: "id", type: "uint256" },
      { name: "newRecipient", type: "address" },
    ],
    outputs: [],
  },
] as const;

export type Receipt = {
  id: number;
  creator: Address;
  owner: Address;
  royaltyRecipient: Address;
  text: string;
  createdAt: number;
  minted: boolean;
};

export const publicClient = createPublicClient({
  chain: base,
  transport: http(RPC_URL),
});

const getWalletClient = () => {
  if (typeof window === "undefined") {
    throw new Error("Wallet not available in this environment.");
  }
  if (!window.ethereum) {
    throw new Error("No injected wallet found.");
  }
  return createWalletClient({
    chain: base,
    transport: custom(window.ethereum),
  });
};

const requireAddress = (address?: Address) => {
  if (!address) {
    throw new Error("Receipt contract address is missing.");
  }
  return address;
};

const normalizeReceipt = (raw: {
  id: bigint;
  creator: Address;
  owner: Address;
  royaltyRecipient: Address;
  text: string;
  createdAt: bigint;
  minted: boolean;
}): Receipt => ({
  id: Number(raw.id),
  creator: raw.creator,
  owner: raw.owner,
  royaltyRecipient: raw.royaltyRecipient,
  text: raw.text,
  createdAt: Number(raw.createdAt),
  minted: raw.minted,
});

export async function getConfig() {
  const address = requireAddress(CONTRACT_ADDRESS);
  return publicClient.readContract({
    address,
    abi: receiptStampAbi,
    functionName: "getConfig",
  });
}

export async function getStats() {
  const address = requireAddress(CONTRACT_ADDRESS);
  return publicClient.readContract({
    address,
    abi: receiptStampAbi,
    functionName: "getStats",
  });
}

export async function getVersion() {
  const address = requireAddress(CONTRACT_ADDRESS);
  return publicClient.readContract({
    address,
    abi: receiptStampAbi,
    functionName: "getVersion",
  });
}

export async function getReceipt(id: number) {
  const address = requireAddress(CONTRACT_ADDRESS);
  const raw = await publicClient.readContract({
    address,
    abi: receiptStampAbi,
    functionName: "getReceipt",
    args: [BigInt(id)],
  });
  return normalizeReceipt(raw);
}

export async function getReceiptsLatest(limit: number) {
  const address = requireAddress(CONTRACT_ADDRESS);
  const raw = await publicClient.readContract({
    address,
    abi: receiptStampAbi,
    functionName: "getReceiptsLatest",
    args: [BigInt(limit)],
  });
  return raw.map(normalizeReceipt);
}

export async function getReceiptsRangeDesc(startId: number, limit: number) {
  const address = requireAddress(CONTRACT_ADDRESS);
  const raw = await publicClient.readContract({
    address,
    abi: receiptStampAbi,
    functionName: "getReceiptsRangeDesc",
    args: [BigInt(startId), BigInt(limit)],
  });
  return raw.map(normalizeReceipt);
}

export async function getReceiptsByOwnerDesc(
  owner: Address,
  startId: number,
  limit: number,
  maxScan: number
) {
  const address = requireAddress(CONTRACT_ADDRESS);
  const [receipts, nextStartId] = await publicClient.readContract({
    address,
    abi: receiptStampAbi,
    functionName: "getReceiptsByOwnerDesc",
    args: [owner, BigInt(startId), BigInt(limit), BigInt(maxScan)],
  });
  return {
    receipts: receipts.map(normalizeReceipt),
    nextStartId: Number(nextStartId),
  };
}

export async function getReceiptsByCreatorDesc(
  creator: Address,
  startId: number,
  limit: number,
  maxScan: number
) {
  const address = requireAddress(CONTRACT_ADDRESS);
  const [receipts, nextStartId] = await publicClient.readContract({
    address,
    abi: receiptStampAbi,
    functionName: "getReceiptsByCreatorDesc",
    args: [creator, BigInt(startId), BigInt(limit), BigInt(maxScan)],
  });
  return {
    receipts: receipts.map(normalizeReceipt),
    nextStartId: Number(nextStartId),
  };
}

export async function getReceiptsByRoyaltyRecipientDesc(
  recipient: Address,
  startId: number,
  limit: number,
  maxScan: number
) {
  const address = requireAddress(CONTRACT_ADDRESS);
  const [receipts, nextStartId] = await publicClient.readContract({
    address,
    abi: receiptStampAbi,
    functionName: "getReceiptsByRoyaltyRecipientDesc",
    args: [recipient, BigInt(startId), BigInt(limit), BigInt(maxScan)],
  });
  return {
    receipts: receipts.map(normalizeReceipt),
    nextStartId: Number(nextStartId),
  };
}

export async function submitReceipt(text: string) {
  const address = requireAddress(CONTRACT_ADDRESS);
  const walletClient = getWalletClient();
  const [account] = await walletClient.getAddresses();
  const fee = await publicClient.readContract({
    address,
    abi: receiptStampAbi,
    functionName: "getStampFeeFor",
    args: [account],
  });

  return walletClient.writeContract({
    address,
    abi: receiptStampAbi,
    functionName: "submitReceipt",
    args: [text],
    account,
    value: fee,
  });
}

export async function submitReceiptFor(text: string, recipient: Address) {
  const address = requireAddress(CONTRACT_ADDRESS);
  const walletClient = getWalletClient();
  const [account] = await walletClient.getAddresses();
  const fee = await publicClient.readContract({
    address,
    abi: receiptStampAbi,
    functionName: "getStampFeeFor",
    args: [account],
  });

  return walletClient.writeContract({
    address,
    abi: receiptStampAbi,
    functionName: "submitReceiptFor",
    args: [text, recipient],
    account,
    value: fee,
  });
}

export async function transferReceipt(id: number, newOwner: Address) {
  const address = requireAddress(CONTRACT_ADDRESS);
  const walletClient = getWalletClient();
  const [account] = await walletClient.getAddresses();
  const fee = await publicClient.readContract({
    address,
    abi: receiptStampAbi,
    functionName: "getRoyaltyFeeFor",
    args: [BigInt(id), account],
  });

  return walletClient.writeContract({
    address,
    abi: receiptStampAbi,
    functionName: "transferReceipt",
    args: [BigInt(id), newOwner],
    account,
    value: fee,
  });
}

export async function setReceiptRoyaltyRecipient(
  id: number,
  newRecipient: Address
) {
  const address = requireAddress(CONTRACT_ADDRESS);
  const walletClient = getWalletClient();
  const [account] = await walletClient.getAddresses();
  return walletClient.writeContract({
    address,
    abi: receiptStampAbi,
    functionName: "setReceiptRoyaltyRecipient",
    args: [BigInt(id), newRecipient],
    account,
  });
}
