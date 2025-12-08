"use client";

import { useEffect } from "react";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { NavBar } from "@/components/NavBar";
import { HeaderTitle } from "@/components/HeaderTitle";
import { HeaderContent } from "@/components/HeaderContent";
import { ReceiptCard } from "@/components/ReceiptCard";
import { ReceiptEditor } from "@/components/ReceiptEditor";
import { Footer } from "@/components/Footer";
import { useMiniAppUser } from "@/hooks/useMiniAppUser";
import { useReceiptContent } from "@/hooks/useReceiptContent";
import { useMiniAppActions } from "@/hooks/useMiniAppActions";
import styles from "@/styles/pages/page.module.css";

export default function Home() {
  const { isFrameReady, setFrameReady } = useMiniKit();
  const { displayName, avatarUrl } = useMiniAppUser();

  const {
    editorText,
    textLimit,
    hasChanges,
    isRendering,
    imageDataUrl,
    setEditorText,
    handleAnother,
    handleApplyEdits,
    activeBody,
  } = useReceiptContent(displayName);

  const {
    isSharing,
    handleOpenStandalone,
    handleTips,
    handleSaveMiniApp,
    handleShare,
  } = useMiniAppActions({
    body: activeBody,
    displayName,
  });

  // Mark Mini App ready
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [isFrameReady, setFrameReady]);

  return (
    <div className={styles.appRoot}>
      {/* NavBar */}
      <NavBar
        titleLink="#"
        titleLabel="Open $MyReceipt Swap Page"
        title="$MyReceipt"
        avatarLink="#"
        avatarLabel="Open User Profile"
        avatarUrl={avatarUrl}
        displayName={displayName}
        fallbackIcon="/icon.png"
        altIcon="MyReceipt Icon"
      />

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.shell}>
          {/* Header */}
          <HeaderTitle>Get Your Receipt</HeaderTitle>
          <HeaderContent>
            {
              <>
                Hi, <strong>{displayName}</strong>! Here&apos;s a small receipt
                for today — a short line to nudge how you see your day onchain
                and off.
              </>
            }
          </HeaderContent>

          {/* Receipt Card */}
          <ReceiptCard
            imageDataUrl={imageDataUrl}
            displayName={displayName}
            isRendering={isRendering}
            imgLoader="/sphere.svg"
            altLoader="Loading receipt..."
            displayText={activeBody}
          />

          {/* Receipt CTA */}
          <ReceiptEditor
            editorLabel="Add Your Own Words to This Receipt"
            editorHint="Start from this version, edit it, or remove it and add your 1-2 lines — then apply it to the card."
            placeholderText="Type 1-2 lines that feel true for you today..."
            textLimit={textLimit}
            editorText={editorText}
            onChange={setEditorText}
            onApply={handleApplyEdits}
            hasChanges={hasChanges}
            updateLabel="Apply your edits to the receipt card."
            updateText="Update Receipt"
            mintLabel="Mint receipt (coming soon)."
            mintText="Mint Receipt (soon)"
            onOpen={handleOpenStandalone}
            displayText={activeBody}
            openLabel="Open this receipt as a standalone image."
            openText="Open as Image"
          />
        </div>
      </main>

      {/* Footer */}
      <Footer
        onGet={handleAnother}
        getAria="Get another receipt."
        getLabel="Get"
        onTips={handleTips}
        tipsAria="Send tips to Prof. NOTA."
        tipsLabel="Tips"
        onPin={handleSaveMiniApp}
        pinAria="Pin MyReceipt mini app."
        pinLabel="Pin"
        onShare={handleShare}
        shareAria="Share receipt of today."
        shareLabel="Share"
        sharingLabel="..."
        isSharing={isSharing}
      />
    </div>
  );
}
