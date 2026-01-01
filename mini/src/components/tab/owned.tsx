"use client";

export function OwnedTab() {
  return (
    <div className="rounded-xl border border-black bg-white p-4 sm:p-6">
      <p className="text-xs uppercase tracking-[0.18em] text-neutral-600">
        Owned receipts
      </p>
      <p className="mt-2 text-sm text-neutral-800">
        Receipts you own will appear here.
      </p>
    </div>
  );
}
