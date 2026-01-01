"use client";

import { formatDateTime, shortenAddress } from "@/lib/formatters";
import { buttonStyles } from "@/lib/button-styles";

type FeedItem = {
  txid: string;
  label: string;
  sender: string;
  recipient?: string;
  timestamp?: string;
  receiptId?: number | null;
};

type FeedTabProps = {
  items: FeedItem[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onReceiptSelect: (id: number) => void;
  title?: string;
  emptyMessage?: string;
};

export function FeedTab({
  items,
  loading,
  error,
  page,
  totalPages,
  onPageChange,
  onReceiptSelect,
  title = "Your Activity Feed",
  emptyMessage = "No matching transactions found for this address.",
}: FeedTabProps) {
  return (
    <div className="space-y-4 rounded-xl border border-black bg-white p-4 sm:p-6">
      <p className="text-xs uppercase tracking-[0.18em] text-neutral-600">
        {title}
      </p>

      {loading && (
        <div className="rounded-md border border-dashed border-neutral-400 bg-neutral-50 p-3 text-sm text-neutral-700">
          Loading on-chain data for feed...
        </div>
      )}

      {error && (
        <div className="rounded-md border border-dashed border-red-400 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="rounded-md border border-dashed border-neutral-400 bg-neutral-50 p-3 text-sm text-neutral-700">
          {emptyMessage}
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <ul className="list-disc space-y-3 pl-4 text-sm text-neutral-800">
          {items.map((item) => (
            <li key={item.txid} className="pl-1">
              <div className="font-semibold">
                {item.receiptId != null ? (
                  (() => {
                    const token = `RECEIPT #${item.receiptId}`;
                    if (!item.label.includes(token)) return item.label;
                    const [before, ...rest] = item.label.split(token);
                    const after = rest.join(token);
                    return (
                      <>
                        {before}
                        <button
                          type="button"
                          onClick={() => onReceiptSelect(item.receiptId!)}
                          className="uppercase underline"
                        >
                          {token}
                        </button>
                        {after}
                      </>
                    );
                  })()
                ) : (
                  item.label
                )}
              </div>
              {item.timestamp && (
                <div className="mt-1 text-[11px] text-neutral-500">
                  {formatDateTime(item.timestamp)}
                </div>
              )}
              <div className="mt-1 text-[11px] text-neutral-600">
                tx. id:{" "}
                <a
                  href={`https://basescan.org/tx/${item.txid}`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  <span className="font-mono">
                    {item.txid.slice(0, 7)} ... {item.txid.slice(-7)}
                  </span>
                </a>{" "}
                <span className="font-mono">(View on Explorer)</span>
              </div>
              <div className="mt-1 text-[11px] text-neutral-600">
                sender:{" "}
                <a
                  href={`https://basescan.org/address/${item.sender}`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  <span className="font-mono">
                    {shortenAddress(item.sender)}
                  </span>
                </a>{" "}
                <span className="font-mono">(View on Explorer)</span>
              </div>
              <div className="mt-1 text-[11px] text-neutral-600">
                recipient:{" "}
                {item.recipient ? (
                  <>
                    <a
                      href={`https://basescan.org/address/${item.recipient}`}
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                    >
                      <span className="font-mono">
                        {shortenAddress(item.recipient)}
                      </span>
                    </a>{" "}
                    <span className="font-mono">(View on Explorer)</span>
                  </>
                ) : (
                  <span className="font-mono">no recipient</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {!loading && !error && totalPages > 1 && (
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className={buttonStyles.action}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, idx) => idx + 1)
            .filter((p) => {
              if (totalPages <= 7) return true;
              if (p === 1 || p === totalPages) return true;
              return Math.abs(p - page) <= 1;
            })
            .map((p, index, visible) => {
              const prev = visible[index - 1];
              const needsGap = prev && p - prev > 1;
              return (
                <span key={p} className="flex items-center gap-2">
                  {needsGap && <span className="text-xs">…</span>}
                  <button
                    type="button"
                    onClick={() => onPageChange(p)}
                    className={`rounded-full border px-3 py-1 uppercase tracking-[0.18em] ${
                      p === page
                        ? "border-black bg-black text-white hover:bg-white hover:text-black"
                        : "border-black bg-white hover:bg-black hover:text-white"
                    }`}
                  >
                    {p}
                  </button>
                </span>
              );
            })}
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={totalPages > 0 && page >= totalPages}
            className={buttonStyles.action}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
