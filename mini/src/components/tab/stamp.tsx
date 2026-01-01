"use client";

import { useState } from "react";
import { useWallet } from "@/hooks/use-wallet";
import { buttonStyles, toggleButtonClass } from "@/lib/button-styles";
import { submitReceipt, submitReceiptFor } from "@/lib/receipt-contract";

export function StampTab() {
  const { address } = useWallet();
  const [text, setText] = useState("");
  const [isGift, setIsGift] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recipientError, setRecipientError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const maxChars = 160;
  const remaining = maxChars - text.length;
  const isOverLimit = remaining < 0;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setRecipientError(null);
    setTxHash(null);

    if (!address) {
      setError("Connect your wallet first.");
      return;
    }

    if (!text.trim()) {
      setError("Your receipt cannot be empty.");
      return;
    }

    if (isOverLimit) {
      setError("Your receipt is too long.");
      return;
    }

    if (isGift) {
      const trimmedRecipient = recipientAddress.trim();
      const looksValid = /^0x[a-fA-F0-9]{40}$/.test(trimmedRecipient);
      if (!trimmedRecipient || !looksValid) {
        setRecipientError("Enter a valid EVM address to send this receipt.");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const hash = isGift
        ? await submitReceiptFor(text.trim(), recipientAddress.trim() as `0x${string}`)
        : await submitReceipt(text.trim());
      setTxHash(hash);
      setText("");
      if (isGift) {
        setRecipientAddress("");
      }
    } catch (err) {
      console.error(err);
      const message =
        err instanceof Error
          ? err.message
          : "Failed to submit receipt. Please check the console for details.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 rounded-xl border border-black bg-white p-4 sm:p-6">
      <p className="text-xs uppercase tracking-[0.18em] text-neutral-600">
        Stamp receipt
      </p>

      <div className="flex flex-wrap gap-2 text-[11px]">
        <button
          type="button"
          onClick={() => setIsGift(false)}
          className={toggleButtonClass(
            !isGift,
            "rounded-full border px-3 py-1 uppercase tracking-[0.18em]"
          )}
        >
          For Me
        </button>
        <button
          type="button"
          onClick={() => setIsGift(true)}
          className={toggleButtonClass(
            isGift,
            "rounded-full border px-3 py-1 uppercase tracking-[0.18em]"
          )}
        >
          As a Gift
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 text-sm">
        <div className="flex flex-col gap-2">
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Write 1-2 lines that feel true today..."
            rows={5}
            className="w-full resize-none border border-black px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
          />
          <div className="flex items-center justify-between text-xs text-neutral-600">
            <span>
              {isOverLimit ? "Over limit" : `${remaining} characters left`}
            </span>
          </div>
        </div>

        {isGift && (
          <div className="flex flex-col gap-2">
            <label className="text-[11px] uppercase tracking-[0.18em] text-neutral-600">
              Recipient address
            </label>
            <input
              type="text"
              value={recipientAddress}
              onChange={(event) => setRecipientAddress(event.target.value)}
              placeholder="0x..."
              className="w-full border border-black px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={buttonStyles.primary}
        >
          {isSubmitting ? "Stamping…" : "Stamp Receipt"}
        </button>

        {error && (
          <div className="rounded-md border border-red-500 bg-red-50 px-3 py-2 text-xs text-red-700">
            {error}
          </div>
        )}

        {recipientError && (
          <div className="rounded-md border border-red-500 bg-red-50 px-3 py-2 text-xs text-red-700">
            {recipientError}
          </div>
        )}

        {txHash && (
          <div className="rounded-md border border-black bg-neutral-50 px-3 py-2 text-xs text-neutral-800">
            Receipt stamped.{" "}
            <a
              href={`https://basescan.org/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              View transaction on BaseScan.
            </a>
          </div>
        )}
      </form>
    </div>
  );
}
