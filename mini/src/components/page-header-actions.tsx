"use client";

import { buttonStyles } from "@/lib/button-styles";

type PageHeaderActionsProps = {
  address?: string | null;
  onRefresh: () => void;
  isRefreshing: boolean;
  disabled?: boolean;
};

export function PageHeaderActions({
  address,
  onRefresh,
  isRefreshing,
  disabled,
}: PageHeaderActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-[11px]">
      {address && (
        <span className="rounded-full border border-black bg-white px-3 py-1 font-mono">
          {address.slice(0, 8)}…{address.slice(-4)}
        </span>
      )}
      <button
        type="button"
        onClick={onRefresh}
        disabled={disabled}
        className={buttonStyles.action}
      >
        {isRefreshing ? "Refreshing…" : "Refresh"}
      </button>
    </div>
  );
}
