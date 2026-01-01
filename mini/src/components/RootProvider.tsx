"use client";

import { ReactNode } from "react";
import { base } from "wagmi/chains";
import { OnchainKitProvider } from "@coinbase/onchainkit";

type RootProviderProps = {
  children: ReactNode;
};

// RootProvider
// ------------
// Wraps the entire React tree with OnchainKitProvider for Base.
// MiniKit is enabled so the Mini App can read host context
// (Base App / Farcaster) and use OnchainKit components.
export function RootProvider({ children }: RootProviderProps) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          mode: "auto",
        },
        wallet: {
          display: "modal",
          preference: "all",
        },
      }}
      miniKit={{
        enabled: true,
        autoConnect: true,
        notificationProxyUrl: undefined,
      }}
    >
      {children}
    </OnchainKitProvider>
  );
}
