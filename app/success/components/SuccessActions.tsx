"use client";

import { RotateCcw, Coins, Pin, Share2 } from "lucide-react";

import styles from "../page.module.css";

type SuccessActionsProps = {
  onGet: () => void;
  onTips: () => void;
  onPin: () => void;
  onShare: () => void;
};

export function SuccessActions({
  onGet,
  onTips,
  onPin,
  onShare,
}: SuccessActionsProps) {
  return (
    <div className={styles.actions}>
      <div className={styles.actionRow}>
        <button
          type="button"
          className={styles.iconButton}
          onClick={onGet}
          aria-label="Get another receipt"
        >
          <RotateCcw className={styles.iconGlyph} />
          <span className={styles.iconLabel}>Get</span>
        </button>

        <button
          type="button"
          className={styles.iconButton}
          onClick={onTips}
          aria-label="Send tips cast"
        >
          <Coins className={styles.iconGlyph} />
          <span className={styles.iconLabel}>Tips</span>
        </button>

        <button
          type="button"
          className={styles.iconButton}
          onClick={onPin}
          aria-label="Pin Mini App"
        >
          <Pin className={styles.iconGlyph} />
          <span className={styles.iconLabel}>Pin</span>
        </button>

        <button
          type="button"
          className={`${styles.iconButton} ${styles.primaryAction}`}
          onClick={onShare}
          aria-label="Share MyReceipt"
        >
          <Share2 className={styles.iconGlyph} />
          <span className={styles.iconLabel}>Share</span>
        </button>
      </div>
    </div>
  );
}
