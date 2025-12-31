"use client";

import styles from "@/styles/components/Receipt.module.css";

type ReceiptCardProps = {
  imageDataUrl: string | null;
  displayName: string;
  isRendering: boolean;
  imgLoader: string;
  altLoader: string;
  displayText: string;
};

export function ReceiptCard({
  imageDataUrl,
  displayName,
  isRendering,
  imgLoader,
  altLoader,
  displayText,
}: ReceiptCardProps) {
  return (
    <section className={styles.receiptSection}>
      <div className={styles.notaCard}>
        {imageDataUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageDataUrl}
            alt={`MyReceipt for ${displayName}`}
            className={styles.notaImage}
          />
        )}

        {!imageDataUrl && isRendering && (
          <div className={styles.notaLoader}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgLoader}
              alt={altLoader}
              className={styles.notaLoaderImage}
            />
          </div>
        )}

        {!imageDataUrl && !isRendering && (
          <div className={styles.notaTextWrapper}>
            <p className={styles.notaText}>{displayText}</p>
          </div>
        )}
      </div>
    </section>
  );
}
