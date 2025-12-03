"use client";
import { ReactNode } from "react";
import { base } from "wagmi/chains";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import "@coinbase/onchainkit/styles.css";

// RootProvider
// -------------
// Wraps the entire application with the OnchainKitProvider for the Base chain.
// MiniKit integration is also enabled here so that:
// - The Mini App can read context from the host (Base App / Farcaster).
// - OnchainKit components (wallet, tx, etc.) can be used within the React tree.
//
// The API key is retrieved from NEXT_PUBLIC_ONCHAINKIT_API_KEY.

export function RootProvider({ children }: { children: ReactNode }) {
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
