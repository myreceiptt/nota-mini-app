"use client";

import { useAccount, useDisconnect } from "wagmi";

export function useWallet() {
  const { address, status } = useAccount();
  const { disconnect } = useDisconnect();

  return {
    address: address ?? null,
    isConnected: status === "connected",
    disconnect,
  };
}
