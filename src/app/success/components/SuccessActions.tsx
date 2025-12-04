"use client";

import { RotateCcw, Coins, Pin, Share2 } from "lucide-react";

import { IconButton } from "../../../components/IconButton";
import styles from "./SuccessActions.module.css";

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
        <IconButton
          onClick={onGet}
          ariaLabel="Get another receipt"
          className={styles.iconButton}
          icon={<RotateCcw className={styles.iconGlyph} />}
          label={<span className={styles.iconLabel}>Get</span>}
        />

        <IconButton
          onClick={onTips}
          ariaLabel="Send tips cast"
          className={styles.iconButton}
          icon={<Coins className={styles.iconGlyph} />}
          label={<span className={styles.iconLabel}>Tips</span>}
        />

        <IconButton
          onClick={onPin}
          ariaLabel="Pin Mini App"
          className={styles.iconButton}
          icon={<Pin className={styles.iconGlyph} />}
          label={<span className={styles.iconLabel}>Pin</span>}
        />

        <IconButton
          onClick={onShare}
          ariaLabel="Share MyReceipt"
          className={`${styles.iconButton} ${styles.primaryAction}`}
          icon={<Share2 className={styles.iconGlyph} />}
          label={<span className={styles.iconLabel}>Share</span>}
        />
      </div>
    </div>
  );
}
