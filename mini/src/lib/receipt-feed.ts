"use client";

import { decodeEventLog, parseAbiItem, type Address } from "viem";
import { publicClient, CONTRACT_ADDRESS } from "@/lib/receipt-contract";

type FeedItem = {
  txid: string;
  label: string;
  sender: string;
  recipient?: string;
  timestamp?: string;
  receiptId?: number | null;
};

const BLOCK_RANGE = BigInt(5000);

const receiptSubmittedEvent = parseAbiItem(
  "event ReceiptSubmitted(uint256 indexed id, address indexed creator, address indexed owner, address royaltyRecipient, uint256 createdAt)"
);
const receiptTransferredEvent = parseAbiItem(
  "event ReceiptTransferred(uint256 indexed id, address indexed from, address indexed to, address royaltyRecipient)"
);
const royaltyUpdatedEvent = parseAbiItem(
  "event ReceiptRoyaltyUpdated(uint256 indexed id, address indexed creator, address indexed newRecipient)"
);
const feesUpdatedEvent = parseAbiItem(
  "event FeesUpdated(uint256 newStampFee, uint256 newRoyaltyFee)"
);
const treasuryUpdatedEvent = parseAbiItem(
  "event TreasuryUpdated(address previousTreasury, address newTreasury)"
);
const nftContractUpdatedEvent = parseAbiItem(
  "event NftContractUpdated(address previousNft, address newNft)"
);
const receiptMintedEvent = parseAbiItem(
  "event ReceiptMinted(uint256 indexed id, address indexed nftContract)"
);

const normalizeAddress = (value?: string | null) =>
  value ? value.toLowerCase() : "";

export async function loadReceiptFeed(options: {
  page: number;
  pageSize: number;
  addressFilter?: Address | null;
}) {
  const address = CONTRACT_ADDRESS;
  if (!address) {
    throw new Error("Receipt contract address is missing.");
  }

  const latestBlock = await publicClient.getBlockNumber();
  const fromBlock =
    latestBlock > BLOCK_RANGE ? latestBlock - BLOCK_RANGE : BigInt(0);

  const [submitted, transferred, royaltyUpdated, feesUpdated, treasuryUpdated, nftUpdated, minted] =
    await Promise.all([
      publicClient.getLogs({ address, event: receiptSubmittedEvent, fromBlock, toBlock: latestBlock }),
      publicClient.getLogs({ address, event: receiptTransferredEvent, fromBlock, toBlock: latestBlock }),
      publicClient.getLogs({ address, event: royaltyUpdatedEvent, fromBlock, toBlock: latestBlock }),
      publicClient.getLogs({ address, event: feesUpdatedEvent, fromBlock, toBlock: latestBlock }),
      publicClient.getLogs({ address, event: treasuryUpdatedEvent, fromBlock, toBlock: latestBlock }),
      publicClient.getLogs({ address, event: nftContractUpdatedEvent, fromBlock, toBlock: latestBlock }),
      publicClient.getLogs({ address, event: receiptMintedEvent, fromBlock, toBlock: latestBlock }),
    ]);

  const allLogs = [
    ...submitted,
    ...transferred,
    ...royaltyUpdated,
    ...feesUpdated,
    ...treasuryUpdated,
    ...nftUpdated,
    ...minted,
  ];

  const addressFilter = normalizeAddress(options.addressFilter);

  const items = allLogs
    .map((log) => {
      const parsed = decodeEventLog({
        abi: [
          receiptSubmittedEvent,
          receiptTransferredEvent,
          royaltyUpdatedEvent,
          feesUpdatedEvent,
          treasuryUpdatedEvent,
          nftContractUpdatedEvent,
          receiptMintedEvent,
        ],
        data: log.data,
        topics: log.topics,
      });

      const eventName = parsed.eventName;
      const args = parsed.args as Record<string, unknown>;
      const baseItem: FeedItem = {
        txid: log.transactionHash ?? "",
        label: "",
        sender: "",
        recipient: undefined,
        timestamp: undefined,
        receiptId: null,
      };

      if (eventName === "ReceiptSubmitted") {
        const id = Number(args.id);
        const creator = String(args.creator);
        const owner = String(args.owner);
        baseItem.receiptId = id;
        baseItem.sender = creator;
        baseItem.recipient = owner;
        baseItem.label =
          creator.toLowerCase() === owner.toLowerCase()
            ? `Stamp RECEIPT #${id} for Self`
            : `Stamp RECEIPT #${id} as Gift to ${owner}`;
      } else if (eventName === "ReceiptTransferred") {
        const id = Number(args.id);
        const from = String(args.from);
        const to = String(args.to);
        baseItem.receiptId = id;
        baseItem.sender = from;
        baseItem.recipient = to;
        baseItem.label = `Transfer RECEIPT #${id} to ${to}`;
      } else if (eventName === "ReceiptRoyaltyUpdated") {
        const id = Number(args.id);
        const creator = String(args.creator);
        const newRecipient = String(args.newRecipient);
        baseItem.receiptId = id;
        baseItem.sender = creator;
        baseItem.recipient = newRecipient;
        baseItem.label = `Royalty recipient updated for RECEIPT #${id} to ${newRecipient}`;
      } else if (eventName === "FeesUpdated") {
        const stampFee = String(args.newStampFee);
        const royaltyFee = String(args.newRoyaltyFee);
        baseItem.label = `Admin updated fees: STAMP-FEE ${stampFee} wei, ROYALTY-FEE ${royaltyFee} wei`;
      } else if (eventName === "TreasuryUpdated") {
        baseItem.label = `Treasury updated to ${String(args.newTreasury)}`;
      } else if (eventName === "NftContractUpdated") {
        baseItem.label = `NFT contract updated to ${String(args.newNft)}`;
      } else if (eventName === "ReceiptMinted") {
        const id = Number(args.id);
        baseItem.receiptId = id;
        baseItem.label = `Receipt NFT minted for RECEIPT #${id}`;
      } else {
        return null;
      }

      if (addressFilter) {
        const senderMatch = normalizeAddress(baseItem.sender) === addressFilter;
        const recipientMatch =
          baseItem.recipient &&
          normalizeAddress(baseItem.recipient) === addressFilter;
        if (!senderMatch && !recipientMatch) return null;
      }

      return {
        ...baseItem,
        _blockNumber: log.blockNumber ?? BigInt(0),
        _logIndex: log.logIndex ?? 0,
      };
    })
    .filter(Boolean) as Array<
    FeedItem & { _blockNumber: bigint; _logIndex: number }
  >;

  items.sort((a, b) => {
    if (a._blockNumber === b._blockNumber) {
      return b._logIndex - a._logIndex;
    }
    return a._blockNumber > b._blockNumber ? -1 : 1;
  });

  const uniqueBlocks = Array.from(
    new Set(items.map((item) => item._blockNumber.toString()))
  ).map((value) => BigInt(value));

  const blockTimes = new Map<string, string>();
  await Promise.all(
    uniqueBlocks.map(async (blockNumber) => {
      const block = await publicClient.getBlock({ blockNumber });
      const timestamp = Number(block.timestamp) * 1000;
      blockTimes.set(blockNumber.toString(), new Date(timestamp).toISOString());
    })
  );

  const feedItems = items.map((item) => ({
    txid: item.txid,
    label: item.label,
    sender: item.sender,
    recipient: item.recipient,
    timestamp: item._blockNumber
      ? blockTimes.get(item._blockNumber.toString())
      : undefined,
    receiptId: item.receiptId ?? null,
  }));

  const total = feedItems.length;
  const start = (options.page - 1) * options.pageSize;
  const paged = feedItems.slice(start, start + options.pageSize);

  return { items: paged, total };
}
