"use client";

import { RotateCcw, Download, Pin, Share2 } from "lucide-react";

import { IconButton } from "./IconButton";

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
        <IconButton
          onClick={onGet}
          ariaLabel="Get another receipt."
          className={styles.iconButton}
          icon={<RotateCcw className={styles.iconGlyph} />}
          label={<span className={styles.iconLabel}>Get</span>}
        />

        <IconButton
          onClick={onTips}
          ariaLabel="Send tips to Prof. NOTA."
          className={styles.iconButton}
          icon={<Download className={styles.iconGlyph} />}
          label={<span className={styles.iconLabel}>Tips</span>}
        />

        <IconButton
          onClick={onPin}
          ariaLabel="Pin MyReceipt mini app."
          className={styles.iconButton}
          icon={<Pin className={styles.iconGlyph} />}
          label={<span className={styles.iconLabel}>Pin</span>}
        />

        <IconButton
          onClick={onShare}
          ariaLabel="Share receipt of today."
          className={`${styles.iconButton} ${styles.primaryAction}`}
          icon={<Share2 className={styles.iconGlyph} />}
          label={
            <span className={styles.iconLabel}>
              {isSharing ? "Sharing…" : "Share"}
            </span>
          }
          disabled={isSharing}
        />
      </div>
    </div>
  );
}
