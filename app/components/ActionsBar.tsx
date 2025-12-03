"use client";

import { RotateCcw, Download, Pin, Share2 } from "lucide-react";

type ActionsBarProps = {
  onGet: () => void;
  onTips: () => void;
  onPin: () => void;
  onShare: () => void;
  isSharing: boolean;
  styles: {
    actions: string;
    actionRow: string;
    iconButton: string;
    primaryAction: string;
    iconGlyph: string;
    iconLabel: string;
  };
};

export function ActionsBar({
  onGet,
  onTips,
  onPin,
  onShare,
  isSharing,
  styles,
}: ActionsBarProps) {
  return (
    <div className={styles.actions}>
      <div className={styles.actionRow}>
        <button
          type="button"
          className={styles.iconButton}
          onClick={onGet}
          aria-label="Get another receipt."
        >
          <RotateCcw className={styles.iconGlyph} />
          <span className={styles.iconLabel}>Get</span>
        </button>

        <button
          type="button"
          className={styles.iconButton}
          onClick={onTips}
          aria-label="Send tips to Prof. NOTA."
        >
          <Download className={styles.iconGlyph} />
          <span className={styles.iconLabel}>Tips</span>
        </button>

        <button
          type="button"
          className={styles.iconButton}
          onClick={onPin}
          aria-label="Pin MyReceipt mini app."
        >
          <Pin className={styles.iconGlyph} />
          <span className={styles.iconLabel}>Pin</span>
        </button>

        <button
          type="button"
          className={`${styles.iconButton} ${styles.primaryAction}`}
          onClick={onShare}
          disabled={isSharing}
          aria-label="Share receipt of today."
        >
          <Share2 className={styles.iconGlyph} />
          <span className={styles.iconLabel}>
            {isSharing ? "Sharing…" : "Share"}
          </span>
        </button>
      </div>
    </div>
  );
}
