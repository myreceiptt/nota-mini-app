"use client";

import { useEffect, useState } from "react";
import { useMiniKit, useComposeCast } from "@coinbase/onchainkit/minikit";
import { minikitConfig } from "../minikit.config";
import styles from "./page.module.css";

const NOTA_LINES: string[] = [
  "We are not against the system. We just don’t pretend it’s neutral.",
  "Your receipt is not the bill; it’s the story of how you spend yourself.",
  "Onchain is just a mirror. What matters is the human looking into it.",
  "Small consistent moves beat one perfect, mythical moment.",
  "You are not late. You are right on time for your own timeline.",
];

export default function Home() {
  const { isFrameReady, setFrameReady, context } = useMiniKit();
  const { composeCastAsync } = useComposeCast();
  const [index, setIndex] = useState(0);
  const [isSharing, setIsSharing] = useState(false);

  // Mark Mini App as ready for the host (Farcaster/Base app)
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [isFrameReady, setFrameReady]);

  const displayName = context?.user?.displayName || "friend";
  const currentNota = NOTA_LINES[index];

  const handleAnother = () => {
    setIndex((prev) => (prev + 1) % NOTA_LINES.length);
  };

  const handleShare = async () => {
    try {
      setIsSharing(true);
      const text = `NOTA of the day:\n\n"${currentNota}"`;

      const result = await composeCastAsync({
        text,
        embeds: [process.env.NEXT_PUBLIC_URL || ""],
      });

      if (result?.cast) {
        console.log("Cast created successfully:", result.cast.hash);
      } else {
        console.log("User cancelled the cast");
      }
    } catch (error) {
      console.error("Error sharing cast:", error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} type="button">
        ✕
      </button>

      <div className={styles.content}>
        <div className={styles.waitlistForm}>
          <h1 className={styles.title}>{minikitConfig.miniapp.name}</h1>

          <p className={styles.subtitle}>
            OiOi, {displayName}. Here&apos;s a small NOTA for today — a short
            line to nudge how you see your day onchain and off.
          </p>

          <div className={styles.notaCard}>
            <p className={styles.notaText}>{currentNota}</p>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={handleAnother}
            >
              Another NOTA
            </button>

            <button
              type="button"
              className={styles.joinButton}
              onClick={handleShare}
              disabled={isSharing}
            >
              {isSharing ? "Sharing..." : "Share to Farcaster"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
