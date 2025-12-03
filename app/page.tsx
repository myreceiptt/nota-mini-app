"use client";

import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { useEffect } from "react";

import { ActionsBar } from "./components/ActionsBar";
import { ReceiptCard } from "./components/ReceiptCard";
import { ReceiptEditor } from "./components/ReceiptEditor";
import { useMiniAppActions } from "./hooks/useMiniAppActions";
import { useReceiptContent } from "./hooks/useReceiptContent";
import { minikitConfig } from "../minikit.config";
import { AppShell } from "./AppShell";
import styles from "./page.module.css";

export default function Home() {
  const { isFrameReady, setFrameReady, context } = useMiniKit();

  // Ambil username kalau ada
  let username: string | undefined;
  if (context && typeof context === "object" && "user" in context) {
    const user = (context as { user?: { username?: string } }).user;
    if (user?.username && user.username.trim().length > 0) {
      username = user.username.trim();
    }
  }

  const displayName =
    (context?.user?.displayName && context.user.displayName.trim().length > 0
      ? context.user.displayName.trim()
      : username) || "OiOi";

  const {
    currentNota,
    editorText,
    renderText,
    displayText,
    textLimit,
    hasChanges,
    isRendering,
    imageDataUrl,
    setEditorText,
    handleAnother,
    handleApplyEdits,
  } = useReceiptContent(displayName);

  const {
    isSharing,
    handleSaveMiniApp,
    handleShare,
    handleOpenStandalone,
    handleTips,
  } = useMiniAppActions({
    renderText,
    currentNota,
    displayName,
  });

  // Mark Mini App ready
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [isFrameReady, setFrameReady]);

  return (
    <AppShell
      header={
        <>
          <h1 className={styles.title}>{minikitConfig.miniapp.name}</h1>
          <p className={styles.subtitle}>
            Hi, <strong>{displayName}</strong>. Here&apos;s a small receipt for
            today — a short line to nudge how you see your day onchain and off.
          </p>
        </>
      }
      footer={
        /* (footer seperti sekarang: Get / Tips / Pin / Share) */
        <ActionsBar
          onGet={handleAnother}
          onTips={handleTips}
          onPin={handleSaveMiniApp}
          onShare={handleShare}
          isSharing={isSharing}
          styles={{
            actions: styles.actions,
            actionRow: styles.actionRow,
            iconButton: styles.iconButton,
            primaryAction: styles.primaryAction,
            iconGlyph: styles.iconGlyph,
            iconLabel: styles.iconLabel,
          }}
        />
      }
    >
      <>
        <ReceiptCard
          imageDataUrl={imageDataUrl}
          isRendering={isRendering}
          displayText={displayText}
          displayName={displayName}
          styles={{
            receiptSection: styles.receiptSection,
            notaCard: styles.notaCard,
            notaImage: styles.notaImage,
            notaLoader: styles.notaLoader,
            notaLoaderImage: styles.notaLoaderImage,
            notaTextWrapper: styles.notaTextWrapper,
            notaText: styles.notaText,
          }}
        />

        <ReceiptEditor
          editorText={editorText}
          onChange={setEditorText}
          textLimit={textLimit}
          hasChanges={hasChanges}
          onApply={handleApplyEdits}
          onOpen={handleOpenStandalone}
          displayText={displayText}
          styles={{
            appendSection: styles.appendSection,
            appendLabel: styles.appendLabel,
            appendTextarea: styles.appendTextarea,
            appendHint: styles.appendHint,
            appendActions: styles.appendActions,
            secondaryButton: styles.secondaryButton,
          }}
        />
      </>
    </AppShell>
  );
}
