"use client";

import styles from "./ReceiptEditor.module.css";

type ReceiptEditorProps = {
  editorText: string;
  onChange: (value: string) => void;
  textLimit: number;
  hasChanges: boolean;
  onApply: () => void;
  onOpen: () => void;
  displayText: string;
};

export function ReceiptEditor({
  editorText,
  onChange,
  textLimit,
  hasChanges,
  onApply,
  onOpen,
  displayText,
}: ReceiptEditorProps) {
  return (
    <section className={styles.appendSection}>
      <label className={styles.appendLabel} htmlFor="user-append">
        Add your own line to this receipt
      </label>

      <textarea
        id="user-append"
        className={styles.appendTextarea}
        placeholder="Type 1–2 lines that feel true for you today…"
        maxLength={textLimit}
        value={editorText}
        onChange={(e) => onChange(e.target.value)}
      />

      <p className={styles.appendHint}>
        Start from this version, edit it, or add 1–2 more lines — then apply it
        to the card.
      </p>

      <div className={styles.appendActions}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={onApply}
          disabled={!editorText.trim() || !hasChanges}
          aria-label="Apply your edits to the receipt card."
        >
          Update receipt
        </button>

        <button
          type="button"
          className={styles.secondaryButton}
          disabled
          aria-label="Mint receipt (coming soon)."
        >
          Mint receipt (soon)
        </button>

        <button
          type="button"
          className={styles.secondaryButton}
          onClick={onOpen}
          disabled={!displayText}
          aria-label="Open this receipt as a standalone image."
        >
          Open as image
        </button>
      </div>
    </section>
  );
}
