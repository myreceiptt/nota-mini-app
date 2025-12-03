"use client";

import styles from "./page.module.css";
import { SuccessActions } from "./components/SuccessActions";
import { SuccessHero } from "./components/SuccessHero";
import { useSuccessActions } from "../hooks/useSuccessActions";

export default function Success() {
  const { handleClose, handleGet, handleTips, handlePin, handleShare } =
    useSuccessActions();

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
        <SuccessHero>
          <h1 className={styles.title}>MyReceipt is OnChain</h1>

          <p className={styles.subtitle}>
            You just shared one small receipt for today.
            <br />
            You can pull another receipt, leave a little tips flow for{" "}
            <strong>Prof. NOTA Inc.</strong>, pin this Mini App, or share it
            again in your own style.
          </p>

          <SuccessActions
            onGet={handleGet}
            onTips={handleTips}
            onPin={handlePin}
            onShare={handleShare}
          />
        </SuccessHero>
      </div>
    </div>
  );
}
