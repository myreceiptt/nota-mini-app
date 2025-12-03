"use client";

import styles from "../page.module.css";

type NavBarProps = {
  title: string;
  avatarUrl?: string;
  displayName: string;
};

export function NavBar({ title, avatarUrl, displayName }: NavBarProps) {
  return (
    <header className={styles.navbar}>
      <div className={styles.navTitle}>{title}</div>
      <div className={styles.navRight}>
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={displayName}
            className={styles.navAvatar}
          />
        ) : (
          // Fallback: icon.png
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/icon.png"
            alt="MyReceipt icon"
            className={styles.navAvatar}
          />
        )}
      </div>
    </header>
  );
}
