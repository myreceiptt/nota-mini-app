"use client";

import { useComposeCast } from "@coinbase/onchainkit/minikit";
import { minikitConfig } from "../../minikit.config";
import styles from "./page.module.css";

export default function Success() {
  const { composeCastAsync } = useComposeCast();

  const handleShare = async () => {
    try {
      const text = `I just visited the ${minikitConfig.miniapp.name} on Base and pulled a NOTA for today.`;

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
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} type="button">
        ✕
      </button>

      <div className={styles.content}>
        <div className={styles.successMessage}>
          <div className={styles.checkmark}>
            <div className={styles.checkmarkCircle}>
              <div className={styles.checkmarkStem}></div>
              <div className={styles.checkmarkKick}></div>
            </div>
          </div>

          <h1 className={styles.title}>Your NOTA is ready.</h1>

          <p className={styles.subtitle}>
            You&apos;ve just stepped into the NOTA Mini App.
            <br />
            Share it as a small onchain receipt of how you see today.
          </p>

          <button onClick={handleShare} className={styles.shareButton}>
            Share to Farcaster
          </button>
        </div>
      </div>
    </div>
  );
}
