"use client";

import styles from "@/styles/components/Receipt.module.css";

type ReceiptImageProps = {
  imageDataUrl: string | null;
  name: string;
  isRendering: boolean;
  imgLoader: string;
  altLoader: string;
  text: string;
};

export function ReceiptImage({
  imageDataUrl,
  name,
  isRendering,
  imgLoader,
  altLoader,
  text,
}: ReceiptImageProps) {
  return (
    <section className={styles.receiptSection}>
      <div className={styles.notaCard}>
        {imageDataUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageDataUrl}
            alt={`MyReceipt for ${name}`}
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
            <p className={styles.notaText}>{text}</p>
          </div>
        )}
      </div>
    </section>
  );
}
