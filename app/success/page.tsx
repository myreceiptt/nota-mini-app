"use client";

import { useComposeCast } from "@coinbase/onchainkit/minikit";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { minikitConfig } from "../../minikit.config";
import styles from "./page.module.css";

export default function Success() {
  const { composeCastAsync } = useComposeCast();
  const router = useRouter();

  const handleClose = () => {
    // Kembali ke halaman utama untuk tarik receipt baru
    router.push("/");
  };

  const handleShare = async () => {
    try {
      const text = `I just pulled today’s MyReceipt from ${minikitConfig.miniapp.name} Mini App on Base.\n\nA small onchain receipt for how I see today, OiOi.\n\n$OiOi $myreceipt $ENDHONESA #base #notaMiniApp`;

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
            You can pull another receipt, and keep supporting{" "}
            <strong>Prof. NOTA Inc.</strong> by spreading your receipt and
            staking <strong>$OiOi</strong>, <strong>$myreceipt</strong>, and{" "}
            <strong>$ENDHONESA</strong> in your own way.
          </p>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={handleClose}
            >
              Pull Another Receipt
            </button>

            <button
              type="button"
              onClick={handleShare}
              className={styles.shareButton}
            >
              Share MyReceipt Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
