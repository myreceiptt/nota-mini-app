"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "@/hooks/use-wallet";
import { PageHeaderActions } from "@/components/page-header-actions";
import { toggleButtonClass } from "@/lib/button-styles";
import { LiveTab } from "@/components/tab/live";
import { ListTab } from "@/components/tab/list";
import { ReceiptModal } from "@/components/receipt-modal";
import { loadReceiptFeed } from "@/lib/receipt-feed";
import {
  getReceipt,
  getReceiptsRangeDesc,
  getStats,
  type Receipt,
} from "@/lib/receipt-contract";

export default function LiveHomePage() {
  const { address } = useWallet();
  const [activeTab, setActiveTab] = useState<"live" | "list">("live");
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

  const [listItems, setListItems] = useState<Receipt[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);
  const [listPage, setListPage] = useState(1);
  const [listTotalPages, setListTotalPages] = useState(1);

  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);

  const feedPageSize = 11;
  const listPageSize = 10;

  const totalFeedPages = useMemo(() => {
    return Math.max(1, Math.ceil(feedTotal / feedPageSize));
  }, [feedTotal, feedPageSize]);

  const fetchFeed = useCallback(
    async (page = 1) => {
      setFeedLoading(true);
      setFeedError(null);
      try {
        const { items, total } = await loadReceiptFeed({
          page,
          pageSize: feedPageSize,
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
    [feedPageSize]
  );

  const fetchList = useCallback(
    async (page = 1) => {
      setListLoading(true);
      setListError(null);
      try {
        const stats = await getStats();
        const lastId = Number(stats[0]);
        if (!lastId) {
          setListItems([]);
          setListTotalPages(1);
          return;
        }
        const totalPages = Math.max(1, Math.ceil(lastId / listPageSize));
        const startId = lastId - (page - 1) * listPageSize;
        const receipts = await getReceiptsRangeDesc(
          startId > 0 ? startId : 0,
          listPageSize
        );
        setListItems(receipts);
        setListTotalPages(totalPages);
      } catch (err) {
        console.error(err);
        setListError("Unable to load receipt gallery. Please try again.");
      } finally {
        setListLoading(false);
      }
    },
    [listPageSize]
  );

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      if (activeTab === "live") {
        await fetchFeed(feedPage);
      } else {
        await fetchList(listPage);
      }
    } finally {
      setIsRefreshing(false);
    }
  }, [activeTab, fetchFeed, fetchList, feedPage, listPage]);

  const handleSelectReceipt = useCallback(async (id: number) => {
    try {
      const receipt = await getReceipt(id);
      setSelectedReceipt(receipt);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "live") {
      fetchFeed(feedPage);
    } else {
      fetchList(listPage);
    }
  }, [activeTab, feedPage, listPage, fetchFeed, fetchList]);

  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-600">
              Live · Base mainnet feed
            </p>
            <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">
              Contract Activity.
            </h1>
          </div>
          <PageHeaderActions
            address={address}
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
            disabled={isRefreshing}
          />
        </div>

        <p className="max-w-xl text-sm leading-relaxed text-neutral-700">
          This page mirrors on-chain activity for the MyReceiptStamp contract on
          Base mainnet. It is visible even without a wallet connection.
        </p>
      </header>

      <div className="flex flex-wrap gap-2 text-[11px]">
        <button
          type="button"
          onClick={() => setActiveTab("live")}
          className={toggleButtonClass(
            activeTab === "live",
            "rounded-full border px-3 py-1 uppercase tracking-[0.18em]"
          )}
        >
          Live
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("list")}
          className={toggleButtonClass(
            activeTab === "list",
            "rounded-full border px-3 py-1 uppercase tracking-[0.18em]"
          )}
        >
          List
        </button>
      </div>

      {activeTab === "live" ? (
        <LiveTab
          items={feedItems}
          loading={feedLoading}
          error={feedError}
          page={feedPage}
          totalPages={totalFeedPages}
          onPageChange={setFeedPage}
          onReceiptSelect={handleSelectReceipt}
        />
      ) : (
        <ListTab
          listItems={listItems}
          listLoading={listLoading}
          listError={listError}
          listPage={listPage}
          totalListPages={listTotalPages}
          onPageChange={setListPage}
          onReceiptSelect={(receipt) => setSelectedReceipt(receipt)}
        />
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
