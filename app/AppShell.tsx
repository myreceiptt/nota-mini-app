"use client";

import { ReactNode } from "react";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import styles from "./page.module.css";

type AppShellProps = {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
};

export function AppShell({ header, footer, children }: AppShellProps) {
  const { context } = useMiniKit();

  let displayName = "OiOi";
  let avatarUrl: string | undefined;

  const user = (context as any)?.user;

  if (user) {
    if (
      typeof user.displayName === "string" &&
      user.displayName.trim().length > 0
    ) {
      displayName = user.displayName.trim();
    } else if (
      typeof user.username === "string" &&
      user.username.trim().length > 0
    ) {
      displayName = user.username.trim();
    }

    avatarUrl =
      (user.pfp && (user.pfp as any).url) ||
      (user.pfpUrl as string | undefined) ||
      (user.avatarUrl as string | undefined) ||
      undefined;
  }

  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className={styles.appRoot}>
      {/* NavBar */}
      <header className={styles.navbar}>
        <div className={styles.navTitle}>MyReceipt</div>
        <div className={styles.navRight}>
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt={displayName}
              className={styles.navAvatar}
            />
          ) : (
            <div className={styles.navAvatarFallback}>{initial}</div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className={styles.main}>
        <div className={styles.shell}>
          {header}
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>{footer}</div>
      </footer>
    </div>
  );
}
