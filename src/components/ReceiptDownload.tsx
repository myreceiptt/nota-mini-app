"use client";

import styles from "@/styles/components/ReceiptCTA.module.css";

type ReceiptDownloadProps = {
  saveLabel: string;
  statusMessage?: string;

  imageDataUrl: string | null;

  // Tombol Copy (opsional)
  onCopy?: () => Promise<void>;
  copyAria?: string;
  copyText?: string;

  // Tombol Save (opsional)
  onSave?: () => void;
  saveAria?: string;
  saveText?: string;

  // Tombol Go Home (opsional)
  onGoHome?: () => void;
  goAria?: string;
  goText?: string;
};

export function ReceiptDownload({
  saveLabel,
  statusMessage,
  imageDataUrl,
  onCopy,
  copyAria,
  copyText,
  onSave,
  saveAria,
  saveText,
  onGoHome,
  goAria,
  goText,
}: ReceiptDownloadProps) {
  return (
    <section className={styles.appendSection}>
      <label className={styles.appendLabel} htmlFor="user-append">
        {saveLabel}
      </label>

      {statusMessage && <p className={styles.appendHint}>{statusMessage}</p>}

      <div className={styles.appendActions}>
        {/* Tombol Copy */}
        {onCopy && copyText && (
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={onCopy}
            disabled={!imageDataUrl}
            aria-label={copyAria}
          >
            {copyText}
          </button>
        )}

        {/* Tombol Save */}
        {onSave && saveText && (
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={onSave}
            disabled={!imageDataUrl}
            aria-label={saveAria}
          >
            {saveText}
          </button>
        )}

        {/* Tombol Go Home */}
        {onGoHome && goText && (
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={onGoHome}
            aria-label={goAria}
          >
            {goText}
          </button>
        )}
      </div>
    </section>
  );
}
