"use client";

import { ReactNode } from "react";
import { RotateCcw, Download, Pin, Share2 } from "lucide-react";
import footerStyles from "@/styles/components/Footer.module.css";

type IconButtonProps = {
  onClick: () => void;
  icon: ReactNode;
  label: ReactNode;
  ariaLabel: string;
  className: string;
  disabled?: boolean;
};

function IconButton({
  onClick,
  icon,
  label,
  ariaLabel,
  className,
  disabled,
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {icon}
      {label}
    </button>
  );
}

type FooterProps = {
  onGet: () => void;
  getAria: string;
  getLabel: string;
  onTips: () => void;
  tipsAria: string;
  tipsLabel: string;
  onPin: () => void;
  pinAria: string;
  pinLabel: string;
  onShare: () => void;
  shareAria: string;
  shareLabel: string;
  sharingLabel: string;
  isSharing?: boolean;
};

export function Footer({
  onGet,
  getAria,
  getLabel,
  onTips,
  tipsAria,
  tipsLabel,
  onPin,
  pinAria,
  pinLabel,
  onShare,
  shareAria,
  shareLabel,
  sharingLabel,
  isSharing,
}: FooterProps) {
  const sharing = !!isSharing;

  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.footerInner}>
        <div className={footerStyles.actions}>
          <div className={footerStyles.actionRow}>
            <IconButton
              onClick={onGet}
              ariaLabel={getAria}
              className={footerStyles.iconButton}
              icon={<RotateCcw className={footerStyles.iconGlyph} />}
              label={<span className={footerStyles.iconLabel}>{getLabel}</span>}
            />

            <IconButton
              onClick={onTips}
              ariaLabel={tipsAria}
              className={footerStyles.iconButton}
              icon={<Download className={footerStyles.iconGlyph} />}
              label={
                <span className={footerStyles.iconLabel}>{tipsLabel}</span>
              }
            />

            <IconButton
              onClick={onPin}
              ariaLabel={pinAria}
              className={footerStyles.iconButton}
              icon={<Pin className={footerStyles.iconGlyph} />}
              label={<span className={footerStyles.iconLabel}>{pinLabel}</span>}
            />

            <IconButton
              onClick={onShare}
              ariaLabel={shareAria}
              className={`${footerStyles.iconButton} ${footerStyles.primaryAction}`}
              icon={<Share2 className={footerStyles.iconGlyph} />}
              label={
                <span className={footerStyles.iconLabel}>
                  {sharing ? sharingLabel : shareLabel}
                </span>
              }
              disabled={sharing}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
