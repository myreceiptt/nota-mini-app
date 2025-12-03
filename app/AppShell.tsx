"use client";

import { ReactNode } from "react";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { NavBar } from "./components/NavBar";
import styles from "./page.module.css";

type MiniKitUser = {
  displayName?: string | null;
  username?: string | null;
  pfp?: { url?: string | null } | null;
  pfpUrl?: string | null;
  avatarUrl?: string | null;
};

type AppShellProps = {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
};

export function AppShell({ header, footer, children }: AppShellProps) {
  const { context } = useMiniKit();

  let displayName = "OiOi";
  let avatarUrl: string | undefined;

  const user = (context as { user?: MiniKitUser } | null)?.user;

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
      user.pfp?.url ||
      user.pfpUrl ||
      user.avatarUrl ||
      undefined;
  }

  return (
    <div className={styles.appRoot}>
      {/* NavBar */}
      <NavBar title="$MyReceipt" avatarUrl={avatarUrl} displayName={displayName} />

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
