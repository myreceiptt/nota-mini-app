"use client";

import type { MouseEvent } from "react";
import styles from "@/styles/components/NavBar.module.css";

type NavBarProps = {
  titleLink: string;
  titleLabel: string;
  title: string;
  avatarLink: string;
  avatarLabel: string;
  avatarUrl?: string;
  displayName: string;
  fallbackIcon: string;
  altIcon: string;
};

export function NavBar({
  titleLink,
  titleLabel,
  title,
  avatarLink,
  avatarLabel,
  avatarUrl,
  displayName,
  fallbackIcon,
  altIcon,
}: NavBarProps) {
  const handlePreventDefault = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  return (
    <header className={styles.navbar}>
      <a
        href={titleLink}
        className={`${styles.navTitle}`}
        aria-label={titleLabel}
        onClick={handlePreventDefault}
      >
        {title}
      </a>

      <div className={styles.navRight}>
        <a
          href={avatarLink}
          aria-label={avatarLabel}
          onClick={handlePreventDefault}
          className={styles.avatarLink}
        >
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt={displayName}
              className={styles.navAvatar}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={fallbackIcon}
              alt={altIcon}
              className={styles.navAvatar}
            />
          )}
        </a>
      </div>
    </header>
  );
}
