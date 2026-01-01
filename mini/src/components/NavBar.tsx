"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Stamp, Receipt, FileText } from "lucide-react";
import { ConnectWalletButton } from "@/components/connect-wallet-button";
import { toggleButtonClass } from "@/lib/button-styles";
import { useWallet } from "@/hooks/use-wallet";

export function Navbar() {
  const { address } = useWallet();
  const isConnected = !!address;
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <header className="border-b border-black bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icon.png"
            alt="logo"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full border border-black object-cover"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold uppercase tracking-[0.2em]">
              $MyReceipt
            </span>
            <span className="text-xs">Base Receipt of Life</span>
          </div>
        </Link>

        <nav className="flex w-full flex-wrap items-center justify-end gap-3 sm:w-auto">
          {isConnected && (
            <>
              <Link
                href="/"
                aria-label="Home"
                title="Home"
                className={toggleButtonClass(
                  isActive("/"),
                  "rounded-full border px-4 py-1 text-xs font-medium uppercase tracking-[0.18em]"
                )}
              >
                <Home size={14} />
              </Link>

              <Link
                href="/stamp"
                aria-label="Stamp"
                title="Stamp"
                className={toggleButtonClass(
                  isActive("/stamp"),
                  "rounded-full border px-4 py-1 text-xs font-medium uppercase tracking-[0.18em]"
                )}
              >
                <Stamp size={14} />
              </Link>

              <Link
                href="/me"
                aria-label="Receipts"
                title="Receipts"
                className={toggleButtonClass(
                  isActive("/me"),
                  "rounded-full border px-4 py-1 text-xs font-medium uppercase tracking-[0.18em]"
                )}
              >
                <Receipt size={14} />
              </Link>

              <Link
                href="/contract"
                aria-label="Contract"
                title="Contract"
                className={toggleButtonClass(
                  isActive("/contract"),
                  "rounded-full border px-4 py-1 text-xs font-medium uppercase tracking-[0.18em]"
                )}
              >
                <FileText size={14} />
              </Link>
            </>
          )}
          <ConnectWalletButton />
        </nav>
      </div>
    </header>
  );
}
