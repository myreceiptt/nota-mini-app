"use client";

import { useComposeCast } from "@coinbase/onchainkit/minikit";
import { useRouter } from "next/navigation";
import { minikitConfig } from "../../minikit.config";
import styles from "./page.module.css";

export default function Success() {
  const router = useRouter();
  const { composeCastAsync } = useComposeCast();

  const handleClose = () => {
    router.push("/"); // kembali ke halaman depan
  };

  const handleShare = async () => {
    try {
      const text = `I just visited ${minikitConfig.miniapp.name} Mini App and pulled a receipt for today, OiOi.`;

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
      <button
        className={styles.closeButton}
        type="button"
        onClick={handleClose}
      >
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

          <h1 className={styles.title}>Your receipt is ready.</h1>

          <p className={styles.subtitle}>
            You&apos;ve just stepped into My Receipt of Today Mini App.
            <br />
            Share it as a small onchain receipt of how you see today.
          </p>

          <button onClick={handleShare} className={styles.shareButton}>
            Share My Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
