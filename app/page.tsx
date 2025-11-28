"use client";

import { useEffect, useState } from "react";
import { useMiniKit, useComposeCast } from "@coinbase/onchainkit/minikit";
import { minikitConfig } from "../minikit.config";
import styles from "./page.module.css";

const NOTA_LINES: string[] = [
  "Her thoughts are galaxies. Her gaze, encrypted.",
  "She folds futures in silence and speaks only when the room is ready.",
  "You call her quiet. But the earth listens when she walks.",
  "...some storms whisper before they strike...",

  "We invested in silence, because it returns clarity.",
  "We invested in doubt, because it returns humility.",

  "You invested in traction. We invested in attention.",
  "Let’s see who lasts longer after the noise dies down.",

  "So let them fear her self-worth and flinch at her joy.",
  "Let them drown in the echo of a woman who no longer waits.",
  "She does not need your validation. She is not your redemption arc.",
  "...she is her own proof...",
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
      const text = `My Receipt of Today:\n\n“${currentNota}”\n\n— pulled from My Receipt of Today Mini App, OiOi.`;

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
      <div className={styles.content}>
        <div className={styles.shell}>
          <h1 className={styles.title}>{minikitConfig.miniapp.name}</h1>

          <p className={styles.subtitle}>
            OiOi, {displayName}! Here&apos;s a small receipt for today — a short
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
              Another Receipt
            </button>

            <button
              type="button"
              className={styles.joinButton}
              onClick={handleShare}
              disabled={isSharing}
            >
              {isSharing ? "Sharing..." : "Share My Receipt"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
