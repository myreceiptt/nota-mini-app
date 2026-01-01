"use client";

import { useState } from "react";
import { useWallet } from "@/hooks/use-wallet";
import { PageHeaderActions } from "@/components/page-header-actions";
import { toggleButtonClass } from "@/lib/button-styles";
import { OwnedTab } from "@/components/tab/owned";
import { CreatedTab } from "@/components/tab/created";
import { RoyaltyTab } from "@/components/tab/royalty";

export default function ReceiptsPage() {
  const { address } = useWallet();
  const [activeTab, setActiveTab] = useState<
    "owned" | "created" | "royalty"
  >("owned");

  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-600">
              Receipts · your activity
            </p>
            <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">
              Your Receipts.
            </h1>
          </div>
          <PageHeaderActions
            address={address}
            onRefresh={() => undefined}
            isRefreshing={false}
            disabled={!address}
          />
        </div>

        <p className="max-w-xl text-sm leading-relaxed text-neutral-700">
          Review receipts you own, created, or collect royalties from.
        </p>
      </header>

      {address ? (
        <>
          <div className="flex flex-wrap gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => setActiveTab("owned")}
              className={toggleButtonClass(
                activeTab === "owned",
                "rounded-full border px-3 py-1 uppercase tracking-[0.18em]"
              )}
            >
              Owned
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("created")}
              className={toggleButtonClass(
                activeTab === "created",
                "rounded-full border px-3 py-1 uppercase tracking-[0.18em]"
              )}
            >
              Created
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("royalty")}
              className={toggleButtonClass(
                activeTab === "royalty",
                "rounded-full border px-3 py-1 uppercase tracking-[0.18em]"
              )}
            >
              Royalty
            </button>
          </div>

          {activeTab === "owned" && <OwnedTab />}
          {activeTab === "created" && <CreatedTab />}
          {activeTab === "royalty" && <RoyaltyTab />}
        </>
      ) : (
        <div className="rounded-md border border-dashed border-black bg-neutral-50 px-3 py-2 text-xs text-neutral-700">
          Connect your wallet to view your receipts.
        </div>
      )}
    </section>
  );
}
