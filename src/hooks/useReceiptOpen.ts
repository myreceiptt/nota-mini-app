"use client";

import { useEffect, useState } from "react";
import { renderReceiptImage } from "../lib/receiptCanvas";

type ReceiptOpenMessages = {
  copyUnsupported: string;
  copySuccess: string;
  copyFailed: string;
  saveUnsupported: string;
  saveSuccess: string;
  saveFailed: string;
};

type UseReceiptOpenOptions = {
  onStatusChange?: (msg: string) => void;
  messages: ReceiptOpenMessages;
};

type UseReceiptOpenResult = {
  imageDataUrl: string | null;
  isRendering: boolean;
  handleCopyImage: () => Promise<void>;
  handleDownloadImage: () => void;
};

export function useReceiptOpen(
  text: string,
  name: string,
  options: UseReceiptOpenOptions
): UseReceiptOpenResult {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState<boolean>(true);

  const { onStatusChange, messages } = options;

  useEffect(() => {
    let cancelled = false;

    const makeImage = async () => {
      if (!text) {
        setIsRendering(false);
        return;
      }

      setIsRendering(true);
      const url = await renderReceiptImage(text, name);

      if (!cancelled) {
        setImageDataUrl(url || "");
        setIsRendering(false);
      }
    };

    makeImage();

    return () => {
      cancelled = true;
    };
  }, [text, name]);

  const handleCopyImage = async () => {
    if (!imageDataUrl) return;

    try {
      if (typeof navigator === "undefined") {
        console.log(
          "[useReceiptOpen] navigator is undefined, copy unsupported"
        );
        onStatusChange?.(messages.copyUnsupported);
        return;
      }

      const clipboard = navigator.clipboard;
      const ClipboardItemCtor =
        typeof ClipboardItem !== "undefined" ? ClipboardItem : undefined;

      if (!clipboard || !ClipboardItemCtor) {
        console.log(
          "[useReceiptOpen] clipboard or ClipboardItem is unavailable, copy unsupported"
        );
        onStatusChange?.(messages.copyUnsupported);
        return;
      }

      const response = await fetch(imageDataUrl);
      const blob = await response.blob();
      const item = new ClipboardItemCtor({ [blob.type]: blob });
      await clipboard.write([item]);

      onStatusChange?.(messages.copySuccess);
    } catch (error) {
      console.error("[useReceiptOpen] Failed to copy image:", error);
      onStatusChange?.(messages.copyFailed);
    }
  };

  const handleDownloadImage = () => {
    if (!imageDataUrl) return;

    if (typeof document === "undefined") {
      console.log("[useReceiptOpen] document is undefined, save unsupported");
      onStatusChange?.(messages.saveUnsupported);
      return;
    }

    try {
      const link = document.createElement("a");
      link.href = imageDataUrl;
      link.download = "myreceipt.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      onStatusChange?.(messages.saveSuccess);
    } catch (error) {
      console.error("[useReceiptOpen] Failed to save image:", error);
      onStatusChange?.(messages.saveFailed);
    }
  };

  return {
    imageDataUrl,
    isRendering,
    handleCopyImage,
    handleDownloadImage,
  };
}
