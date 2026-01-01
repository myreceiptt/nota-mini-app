"use client";

import { Receipt } from "@/lib/receipt-contract";
import { buttonStyles } from "@/lib/button-styles";
import { Receipt as ReceiptIcon } from "lucide-react";

type ListTabProps = {
  listItems: Receipt[];
  listLoading: boolean;
  listError: string | null;
  listPage: number;
  totalListPages: number;
  onPageChange: (page: number) => void;
  onReceiptSelect: (receipt: Receipt) => void;
  title?: string;
  emptyMessage?: string;
};

export function ListTab({
  listItems,
  listLoading,
  listError,
  listPage,
  totalListPages,
  onPageChange,
  onReceiptSelect,
  title = "Receipt Gallery",
  emptyMessage = "No receipts found yet.",
}: ListTabProps) {
  return (
    <div className="space-y-4 rounded-xl border border-black bg-white p-4 sm:p-6">
      <p className="text-xs uppercase tracking-[0.18em] text-neutral-600">
        {title}
      </p>

      {listLoading && (
        <div className="rounded-md border border-dashed border-neutral-400 bg-neutral-50 p-3 text-sm text-neutral-700">
          Loading on-chain receipt gallery...
        </div>
      )}

      {listError && (
        <div className="rounded-md border border-dashed border-red-400 bg-red-50 p-3 text-sm text-red-700">
          {listError}
        </div>
      )}

      {!listLoading && !listError && listItems.length === 0 && (
        <div className="rounded-md border border-dashed border-neutral-400 bg-neutral-50 p-3 text-sm text-neutral-700">
          {emptyMessage}
        </div>
      )}

      {!listLoading && !listError && listItems.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {listItems.map((receipt) => (
            <div key={receipt.id} className="space-y-2">
              <button
                type="button"
                onClick={() => onReceiptSelect(receipt)}
                aria-label={`Open receipt ${receipt.id}`}
                className="w-full rounded-xl border border-black bg-white p-3 shadow-[4px_4px_0_0_#000] transition hover:-translate-y-0.5"
              >
                <div className="aspect-1074/1474 w-full rounded-lg border border-black bg-neutral-50">
                  <div className="flex h-full w-full items-center justify-center">
                    <ReceiptIcon className="text-[clamp(4rem,18vw,7rem)]" />
                  </div>
                </div>
              </button>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => onReceiptSelect(receipt)}
                  className={buttonStyles.action}
                >
                  RECEIPT #{receipt.id}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!listLoading && !listError && totalListPages > 1 && (
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <button
            type="button"
            onClick={() => onPageChange(listPage - 1)}
            disabled={listPage === 1}
            className={buttonStyles.action}
          >
            Prev
          </button>
          {Array.from({ length: totalListPages }, (_, idx) => idx + 1)
            .filter((page) => {
              if (totalListPages <= 7) return true;
              if (page === 1 || page === totalListPages) return true;
              return Math.abs(page - listPage) <= 1;
            })
            .map((page, index, visible) => {
              const prev = visible[index - 1];
              const needsGap = prev && page - prev > 1;
              return (
                <span key={page} className="flex items-center gap-2">
                  {needsGap && <span className="text-xs">…</span>}
                  <button
                    type="button"
                    onClick={() => onPageChange(page)}
                    className={`rounded-full border px-3 py-1 uppercase tracking-[0.18em] ${
                      page === listPage
                        ? "border-black bg-black text-white hover:bg-white hover:text-black"
                        : "border-black bg-white hover:bg-black hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                </span>
              );
            })}
          <button
            type="button"
            onClick={() => onPageChange(listPage + 1)}
            disabled={totalListPages > 0 && listPage >= totalListPages}
            className={buttonStyles.action}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
