"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { useOpenReceipt } from "../hooks/useOpenReceipt";
import styles from "../page.module.css";
import cardStyles from "../components/ReceiptCard.module.css";
import editorStyles from "../components/ReceiptEditor.module.css";

function OpenReceiptContent() {
  const searchParams = useSearchParams();
  const text = searchParams.get("text") ?? "";
  const name = searchParams.get("name") ?? "OiOi";

  const { imageDataUrl, isRendering, copyStatus, handleCopyImage, handleDownloadImage } =
    useOpenReceipt(text, name);

  if (!text) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.shell}>
            <h1 className={styles.title}>MyReceipt image</h1>
            <p className={styles.subtitle}>
              No receipt text was provided. Please open this page from the
              MyReceipt Mini App.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.shell}>
          <h1 className={styles.title}>MyReceipt image</h1>

          <p className={styles.subtitle}>
            Long-press the image to save it, or use the buttons below to copy or
            download this receipt.
          </p>

          <div className={cardStyles.notaCard}>
            {imageDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageDataUrl}
                alt="MyReceipt"
                className={cardStyles.notaImage}
              />
            ) : isRendering ? (
              <div className={cardStyles.notaLoader}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/sphere.svg"
                  alt="Loading receipt…"
                  className={cardStyles.notaLoaderImage}
                />
              </div>
            ) : (
              <p className={cardStyles.notaText}>{text}</p>
            )}
          </div>

          {copyStatus && (
            <p
              className={editorStyles.appendHint}
              style={{ marginTop: "0.5rem" }}
            >
              {copyStatus}
            </p>
          )}

          <button
            type="button"
            className={editorStyles.secondaryButton}
            onClick={handleCopyImage}
            disabled={!imageDataUrl}
          >
            Copy image to clipboard
          </button>

          <button
            type="button"
            className={editorStyles.secondaryButton}
            onClick={handleDownloadImage}
            disabled={!imageDataUrl}
          >
            Save image
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OpenReceiptPage() {
  return (
    <Suspense fallback={null}>
      <OpenReceiptContent />
    </Suspense>
  );
}
