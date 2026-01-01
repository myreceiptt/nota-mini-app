"use client";

import { ConnectWallet } from "@coinbase/onchainkit/wallet";
import { useWallet } from "@/hooks/use-wallet";
import { buttonStyles } from "@/lib/button-styles";

export function ConnectWalletButton() {
  const { isConnected, disconnect } = useWallet();

  if (isConnected) {
    return (
      <button
        type="button"
        onClick={() => disconnect()}
        className={buttonStyles.action}
      >
        Disconnect
      </button>
    );
  }

  return (
    <ConnectWallet className={buttonStyles.action}>
      Connect Wallet
    </ConnectWallet>
  );
}
