"use client";

import { useEffect, useState } from "react";

import { renderReceiptImage } from "../lib/receiptCanvas";

type UseOpenReceiptResult = {
  imageDataUrl: string | null;
  isRendering: boolean;
  copyStatus: string;
  handleCopyImage: () => Promise<void>;
  handleDownloadImage: () => void;
};

export function useOpenReceipt(
  text: string,
  name: string
): UseOpenReceiptResult {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState<boolean>(true);
  const [copyStatus, setCopyStatus] = useState<string>("");

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
        setCopyStatus("Copy image is not supported in this browser.");
        return;
      }

      const clipboard = navigator.clipboard;
      const ClipboardItemCtor =
        typeof ClipboardItem !== "undefined" ? ClipboardItem : undefined;

      if (!clipboard || !ClipboardItemCtor) {
        setCopyStatus("Copy image is not supported in this browser.");
        return;
      }

      const response = await fetch(imageDataUrl);
      const blob = await response.blob();
      const item = new ClipboardItemCtor({ [blob.type]: blob });
      await clipboard.write([item]);

      setCopyStatus("Image copied to clipboard.");
    } catch (error) {
      console.error("Failed to copy image:", error);
      setCopyStatus("Failed to copy image.");
    }
  };

  const handleDownloadImage = () => {
    if (!imageDataUrl) return;
    if (typeof document === "undefined") return;

    const link = document.createElement("a");
    link.href = imageDataUrl;
    link.download = "myreceipt.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    imageDataUrl,
    isRendering,
    copyStatus,
    handleCopyImage,
    handleDownloadImage,
  };
}
