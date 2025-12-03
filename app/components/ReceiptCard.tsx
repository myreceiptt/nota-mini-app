"use client";

type ReceiptCardProps = {
  imageDataUrl: string | null;
  isRendering: boolean;
  displayText: string;
  displayName: string;
  styles: {
    receiptSection: string;
    notaCard: string;
    notaImage: string;
    notaLoader: string;
    notaLoaderImage: string;
    notaTextWrapper: string;
    notaText: string;
  };
};

export function ReceiptCard({
  imageDataUrl,
  isRendering,
  displayText,
  displayName,
  styles,
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
              src="/sphere.svg"
              alt="Loading receipt…"
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
