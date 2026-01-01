"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { HeaderTitle } from "@/components/HeaderTitle";
import { HeaderContent } from "@/components/HeaderContent";
import { ReceiptImage } from "@/components/ReceiptImage";
import { ReceiptDownload } from "@/components/ReceiptDownload";
import { useMiniAppUser } from "@/hooks/useMiniAppUser";
import { useReceiptOpen } from "@/hooks/useReceiptOpen";
import { useMiniAppActions } from "@/hooks/useMiniAppActions";
import { getBaseUrl } from "@/lib/env";
import { buildOpenShareText } from "@/lib/shareText";

function OpenReceiptContent() {
  const router = useRouter();
  const { isFrameReady, setFrameReady } = useMiniKit();
  const { displayName } = useMiniAppUser();

  const searchParams = useSearchParams();
  const rawText = searchParams.get("text") ?? "";
  const name = searchParams.get("name") ?? "OiOi";

  // Apakah ada receipt asli dari URL?
  const hasText = rawText.trim().length > 0;

  // Pesan fallback kalau tidak ada receipt
  const emptyMessage =
    "No receipt to open yet.\nTry generating one from the Home page first.";

  // Text yang akan DITAMPILKAN di kartu
  const displayText = hasText ? rawText : emptyMessage;

  // Default hint (juga akan dipakai sebagai nilai awal statusMessage)
  const saveHint =
    "Long-press the image to save it, or use the buttons below to copy or download your receipt.";

  // Status yang akan menggantikan saveHint setelah Copy/Save
  const [statusMessage, setStatusMessage] = useState<string>(saveHint);

  const { imageDataUrl, isRendering, handleCopyImage, handleDownloadImage } =
    useReceiptOpen(rawText, name, {
      onStatusChange: setStatusMessage,
      messages: {
        copyUnsupported: "Copy image is not supported in this browser.",
        copySuccess: "Image copied to clipboard.",
        copyFailed: "Failed to copy image.",
        saveUnsupported: "Save image is not supported in this browser.",
        saveSuccess: "Image downloaded and saved.",
        saveFailed: "Failed to save image.",
      },
    });

  // Embed URL spesifik untuk halaman /open (+ query text & name bila ada)
  const baseOrigin = getBaseUrl();
  const openEmbedUrl = hasText
    ? `${baseOrigin}/open?text=${encodeURIComponent(
        rawText
      )}&name=${encodeURIComponent(name)}`
    : baseOrigin;

  // Actions untuk Footer: pakai body = rawText (bukan displayText),
  // supaya kalau tidak ada receipt asli, Share akan otomatis NO-OP.
  const { isSharing, handleTips, handleSaveMiniApp, handleShare } =
    useMiniAppActions({
      body: rawText,
      displayName,
      buildShareText: buildOpenShareText,
      embedUrl: openEmbedUrl,
    });

  // Mark Mini App ready
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [isFrameReady, setFrameReady]);

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-6 text-center">
      <HeaderTitle>Image of Receipt</HeaderTitle>
      <HeaderContent>
        <>
          Hi, <strong>{displayName}</strong>! This is an image of a small
          receipt — a short line that nudges how we see today. Save and share
          it.
        </>
      </HeaderContent>

      <ReceiptImage
        imageDataUrl={imageDataUrl}
        name={name}
        isRendering={isRendering}
        imgLoader="/sphere.svg"
        altLoader="Loading receipt..."
        text={displayText}
      />

      {hasText ? (
        <ReceiptDownload
          saveLabel="Use The Buttons Below"
          statusMessage={statusMessage}
          imageDataUrl={imageDataUrl}
          onCopy={handleCopyImage}
          copyAria="Copy image to clipboard."
          copyText="Copy Image"
          onSave={handleDownloadImage}
          saveAria="Download and save image."
          saveText="Save Image"
        />
      ) : (
        <ReceiptDownload
          saveLabel="The Home Button"
          imageDataUrl={null}
          onGoHome={() => router.push("/")}
          goAria="Go to the Home page."
          goText="Go To Home Page"
        />
      )}

      <div className="flex flex-wrap justify-center gap-3 text-xs uppercase tracking-[0.18em] text-neutral-600">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="rounded-full border border-black px-3 py-1 hover:bg-black hover:text-white"
        >
          Get
        </button>
        <button
          type="button"
          onClick={handleTips}
          className="rounded-full border border-black px-3 py-1 hover:bg-black hover:text-white"
        >
          Tips
        </button>
        <button
          type="button"
          onClick={handleSaveMiniApp}
          className="rounded-full border border-black px-3 py-1 hover:bg-black hover:text-white"
        >
          Pin
        </button>
        <button
          type="button"
          onClick={handleShare}
          disabled={isSharing}
          className="rounded-full border border-black px-3 py-1 hover:bg-black hover:text-white disabled:opacity-50"
        >
          {isSharing ? "..." : "Share"}
        </button>
      </div>
    </section>
  );
}

export default function OpenReceiptPage() {
  return (
    <Suspense fallback={null}>
      <OpenReceiptContent />
    </Suspense>
  );
}
