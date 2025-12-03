"use client";

import { useEffect, useMemo, useState } from "react";

import { renderReceiptImage } from "../lib/receiptCanvas";
import { generateReceipt, getMaxReceiptLength } from "../receiptTemplates";

type UseReceiptContentResult = {
  currentNota: string;
  editorText: string;
  renderText: string;
  displayText: string;
  textLimit: number;
  hasChanges: boolean;
  isRendering: boolean;
  imageDataUrl: string | null;
  setEditorText: (value: string) => void;
  handleAnother: () => void;
  handleApplyEdits: () => void;
};

export function useReceiptContent(displayName: string): UseReceiptContentResult {
  const [currentNota, setCurrentNota] = useState<string>("");
  const [nameUsed, setNameUsed] = useState<string>(displayName);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

  const [editorText, setEditorText] = useState<string>("");
  const [renderText, setRenderText] = useState<string>("");
  const [isRendering, setIsRendering] = useState<boolean>(true);

  const textLimit = useMemo(
    () => getMaxReceiptLength(displayName),
    [displayName]
  );

  const hasChanges = useMemo(
    () => editorText.trim() !== renderText.trim(),
    [editorText, renderText]
  );

  // Generate receipt pertama kali & setiap nama berubah
  useEffect(() => {
    if (!currentNota || nameUsed !== displayName) {
      const next = generateReceipt(displayName);
      setCurrentNota(next);
      setNameUsed(displayName);

      // default textarea = template yang sedang dipakai
      setEditorText(next);
      // isi kartu & image = template ini juga
      setRenderText(next);

      setImageDataUrl(null);
      setIsRendering(true);
    }
  }, [displayName, currentNota, nameUsed]);

  // Render PNG berbasis renderText + displayName
  useEffect(() => {
    let cancelled = false;

    const makeImage = async () => {
      if (!renderText) return;
      setIsRendering(true);

      const url = await renderReceiptImage(renderText, displayName);

      if (!cancelled) {
        setImageDataUrl(url || "");
        setIsRendering(false);
      }
    };

    makeImage();

    return () => {
      cancelled = true;
    };
  }, [renderText, displayName]);

  const handleAnother = () => {
    const next = generateReceipt(displayName);
    setCurrentNota(next);
    setEditorText(next);
    setRenderText(next);
    setImageDataUrl(null);
    // isRendering akan di-set di effect renderText
  };

  const handleApplyEdits = () => {
    const trimmed = editorText.trim();
    // kalau kosong atau tidak ada perubahan → NO-OP
    if (!trimmed || !hasChanges) return;

    setRenderText(trimmed);
    setImageDataUrl(null);
    // isRendering akan di-set di effect renderText
  };

  const displayText = renderText || currentNota;

  return {
    currentNota,
    editorText,
    renderText,
    displayText,
    textLimit,
    hasChanges,
    isRendering,
    imageDataUrl,
    setEditorText,
    handleAnother,
    handleApplyEdits,
  };
}
