"use client";

import styles from "@/styles/components/ReceiptCTA.module.css";

type ReceiptEditorProps = {
  editorLabel: string;
  editorHint: string;
  placeholderText: string;
  textLimit: number;
  editorText: string;
  onChange: (value: string) => void;
  onApply: () => void;
  hasChanges: boolean;
  updateLabel: string;
  updateText: string;
  mintLabel: string;
  mintText: string;
  onOpen: () => void;
  displayText: string;
  openLabel: string;
  openText: string;
};

export function ReceiptEditor({
  editorLabel,
  editorHint,
  placeholderText,
  textLimit,
  editorText,
  onChange,
  onApply,
  hasChanges,
  updateLabel,
  updateText,
  mintLabel,
  mintText,
  onOpen,
  displayText,
  openLabel,
  openText,
}: ReceiptEditorProps) {
  return (
    <section className={styles.appendSection}>
      <label className={styles.appendLabel} htmlFor="user-append">
        {editorLabel}
      </label>
      <p className={styles.appendHint}>{editorHint}</p>

      <textarea
        id="user-append"
        className={styles.appendTextarea}
        placeholder={placeholderText}
        maxLength={textLimit}
        value={editorText}
        onChange={(e) => onChange(e.target.value)}
      />

      <div className={styles.appendActions}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={onApply}
          disabled={!editorText.trim() || !hasChanges}
          aria-label={updateLabel}
        >
          {updateText}
        </button>

        <button
          type="button"
          className={styles.secondaryButton}
          disabled
          aria-label={mintLabel}
        >
          {mintText}
        </button>

        <button
          type="button"
          className={styles.secondaryButton}
          onClick={onOpen}
          disabled={!displayText}
          aria-label={openLabel}
        >
          {openText}
        </button>
      </div>
    </section>
  );
}
