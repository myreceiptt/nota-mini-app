"use client";

import { useState } from "react";
import { useWallet } from "@/hooks/use-wallet";
import { PageHeaderActions } from "@/components/page-header-actions";
import { toggleButtonClass } from "@/lib/button-styles";
import { VersionTab } from "@/components/tab/version";
import { StatusTab } from "@/components/tab/status";
import { UpdateTab } from "@/components/tab/update";

export default function ContractPage() {
  const { address } = useWallet();
  const [activeTab, setActiveTab] = useState<
    "version" | "status" | "update"
  >("version");

  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-600">
              Contract · config + stats
            </p>
            <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">
              Contract Dashboard.
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
          Manage and review on-chain contract data for MyReceiptStamp.
        </p>
      </header>

      {address ? (
        <>
          <div className="flex flex-wrap gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => setActiveTab("version")}
              className={toggleButtonClass(
                activeTab === "version",
                "rounded-full border px-3 py-1 uppercase tracking-[0.18em]"
              )}
            >
              Version
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("status")}
              className={toggleButtonClass(
                activeTab === "status",
                "rounded-full border px-3 py-1 uppercase tracking-[0.18em]"
              )}
            >
              Status
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("update")}
              className={toggleButtonClass(
                activeTab === "update",
                "rounded-full border px-3 py-1 uppercase tracking-[0.18em]"
              )}
            >
              Update
            </button>
          </div>

          {activeTab === "version" && <VersionTab />}
          {activeTab === "status" && <StatusTab />}
          {activeTab === "update" && <UpdateTab />}
        </>
      ) : (
        <div className="rounded-md border border-dashed border-black bg-neutral-50 px-3 py-2 text-xs text-neutral-700">
          Connect your wallet to view contract data.
        </div>
      )}
    </section>
  );
}
