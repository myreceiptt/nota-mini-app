"use client";

import { useComposeCast, useAddFrame } from "@coinbase/onchainkit/minikit";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RotateCcw, Coins, Pin, Share2 } from "lucide-react";

import { minikitConfig } from "../../minikit.config";
import styles from "./page.module.css";

export default function Success() {
  const { composeCastAsync } = useComposeCast();
  const addFrame = useAddFrame();
  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://mini.endhonesa.com";

  const handleClose = () => {
    // Kembali ke Home untuk "get" receipt baru
    router.push("/");
  };

  const handleGet = () => {
    // Alias dari close: langsung balik ke halaman utama
    router.push("/");
  };

  const handleTips = async () => {
    try {
      const text = `If today's receipt landed for you, consider tipping or collecting around $MyReceipt / $ENDHONESA to support Prof. NOTA.\n\n$MyReceipt for $ENDHONESA, $OiOi!`;

      const result = await composeCastAsync({
        text,
        embeds: [baseUrl],
      });

      if (result?.cast) {
        console.log("Tip cast created successfully:", result.cast.hash);
      } else {
        console.log("User cancelled the tip cast");
      }
    } catch (error) {
      console.error("Error sharing tip cast:", error);
    }
  };

  const handlePin = async () => {
    try {
      const result = await addFrame();
      if (result) {
        console.log("Mini App saved in host:", result);
      } else {
        console.log("Save Mini App cancelled or unavailable");
      }
    } catch (error) {
      console.error("Error saving Mini App:", error);
    }
  };

  const handleShare = async () => {
    try {
      const text = `I just pulled today's receipt from ${minikitConfig.miniapp.name} Mini App on Base.\n\nA small onchain receipt for how I see today, OiOi.\n\n$MyReceipt $ENDHONESA $OiOi`;

      const result = await composeCastAsync({
        text,
        embeds: [baseUrl],
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
        aria-label="Back to MyReceipt"
      >
        ✕
      </button>

      <div className={styles.content}>
        <div className={styles.shell}>
          <div className={styles.avatarWrapper}>
            <Image
              src="/nota-pfp.png"
              alt="Prof. NOTA Inc."
              width={96}
              height={96}
              className={styles.notaAvatar}
            />
          </div>

          <h1 className={styles.title}>MyReceipt is OnChain</h1>

          <p className={styles.subtitle}>
            You just shared one small receipt for today.
            <br />
            You can pull another receipt, leave a little tips flow for{" "}
            <strong>Prof. NOTA Inc.</strong>, pin this Mini App, or share it
            again in your own style.
          </p>

          <div className={styles.actions}>
            <div className={styles.actionRow}>
              <button
                type="button"
                className={styles.iconButton}
                onClick={handleGet}
                aria-label="Get another receipt"
              >
                <RotateCcw className={styles.iconGlyph} />
                <span className={styles.iconLabel}>Get</span>
              </button>

              <button
                type="button"
                className={styles.iconButton}
                onClick={handleTips}
                aria-label="Send tips cast"
              >
                <Coins className={styles.iconGlyph} />
                <span className={styles.iconLabel}>Tips</span>
              </button>

              <button
                type="button"
                className={styles.iconButton}
                onClick={handlePin}
                aria-label="Pin Mini App"
              >
                <Pin className={styles.iconGlyph} />
                <span className={styles.iconLabel}>Pin</span>
              </button>

              <button
                type="button"
                className={`${styles.iconButton} ${styles.primaryAction}`}
                onClick={handleShare}
                aria-label="Share MyReceipt"
              >
                <Share2 className={styles.iconGlyph} />
                <span className={styles.iconLabel}>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
