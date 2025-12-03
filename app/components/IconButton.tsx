"use client";

import { ReactNode } from "react";

type IconButtonProps = {
  onClick: () => void;
  icon: ReactNode;
  label: ReactNode;
  ariaLabel: string;
  className: string;
  disabled?: boolean;
};

export function IconButton({
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
