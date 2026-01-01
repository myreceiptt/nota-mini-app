"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "@/hooks/use-wallet";
import { PageHeaderActions } from "@/components/page-header-actions";
import { toggleButtonClass } from "@/lib/button-styles";
import { StampTab } from "@/components/tab/stamp";
import { FeedTab } from "@/components/tab/feed";
import { ReceiptModal } from "@/components/receipt-modal";
import { loadReceiptFeed } from "@/lib/receipt-feed";
import { getReceipt, type Receipt } from "@/lib/receipt-contract";

export default function StampPage() {
  const { address } = useWallet();
  const [activeTab, setActiveTab] = useState<"stamp" | "feed">("stamp");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedItems, setFeedItems] = useState<
    Array<{
      txid: string;
      label: string;
      sender: string;
      recipient?: string;
      timestamp?: string;
      receiptId?: number | null;
    }>
  >([]);
  const [feedLoading, setFeedLoading] = useState(false);
  const [feedError, setFeedError] = useState<string | null>(null);
  const [feedPage, setFeedPage] = useState(1);
  const [feedTotal, setFeedTotal] = useState(0);
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);

  const feedPageSize = 11;
  const totalFeedPages = useMemo(() => {
    return Math.max(1, Math.ceil(feedTotal / feedPageSize));
  }, [feedTotal, feedPageSize]);

  const fetchFeed = useCallback(
    async (page = 1) => {
      if (!address) return;
      setFeedLoading(true);
      setFeedError(null);
      try {
        const { items, total } = await loadReceiptFeed({
          page,
          pageSize: feedPageSize,
          addressFilter: address,
        });
        setFeedItems(items);
        setFeedTotal(total);
      } catch (err) {
        console.error(err);
        setFeedError("Unable to load the feed. Please try again.");
      } finally {
        setFeedLoading(false);
      }
    },
    [address, feedPageSize]
  );

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      if (activeTab === "feed") {
        await fetchFeed(feedPage);
      }
    } finally {
      setIsRefreshing(false);
    }
  }, [activeTab, fetchFeed, feedPage]);

  const handleSelectReceipt = useCallback(async (id: number) => {
    try {
      const receipt = await getReceipt(id);
      setSelectedReceipt(receipt);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "feed") {
      fetchFeed(feedPage);
    }
  }, [activeTab, feedPage, fetchFeed]);

  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-600">
              Stamp · create receipts
            </p>
            <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">
              Stamp Your Receipt.
            </h1>
          </div>
          <PageHeaderActions
            address={address}
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
            disabled={!address || isRefreshing}
          />
        </div>

        <p className="max-w-xl text-sm leading-relaxed text-neutral-700">
          Stamp a receipt on Base mainnet and track your activity.
        </p>
      </header>

      {address ? (
        <>
          <div className="flex flex-wrap gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => setActiveTab("stamp")}
              className={toggleButtonClass(
                activeTab === "stamp",
                "rounded-full border px-3 py-1 uppercase tracking-[0.18em]"
              )}
            >
              Stamp
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("feed")}
              className={toggleButtonClass(
                activeTab === "feed",
                "rounded-full border px-3 py-1 uppercase tracking-[0.18em]"
              )}
            >
              Feed
            </button>
          </div>

          {activeTab === "stamp" ? (
            <StampTab />
          ) : (
            <FeedTab
              items={feedItems}
              loading={feedLoading}
              error={feedError}
              page={feedPage}
              totalPages={totalFeedPages}
              onPageChange={setFeedPage}
              onReceiptSelect={handleSelectReceipt}
            />
          )}
        </>
      ) : (
        <div className="rounded-md border border-dashed border-black bg-neutral-50 px-3 py-2 text-xs text-neutral-700">
          Connect your wallet to stamp a receipt.
        </div>
      )}

      <ReceiptModal
        isOpen={!!selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
        receipt={
          selectedReceipt
            ? {
                id: selectedReceipt.id,
                text: selectedReceipt.text,
                creator: selectedReceipt.creator,
                createdAt: selectedReceipt.createdAt,
              }
            : null
        }
        locked={!address}
      />
    </section>
  );
}
