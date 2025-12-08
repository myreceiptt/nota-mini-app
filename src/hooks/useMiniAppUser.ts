"use client";

import { useMiniKit } from "@coinbase/onchainkit/minikit";

type MiniKitUser = {
  displayName?: string | null;
  username?: string | null;
  pfp?: { url?: string | null } | null;
  pfpUrl?: string | null;
  avatarUrl?: string | null;
};

type MiniAppUser = {
  displayName: string;
  avatarUrl?: string;
};

export function useMiniAppUser(): MiniAppUser {
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
      displayName = `@${user.username.trim()}`;
    }

    avatarUrl = user.pfp?.url || user.pfpUrl || user.avatarUrl || undefined;
  }

  return { displayName, avatarUrl };
}
