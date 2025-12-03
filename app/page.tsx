"use client";

import {
  useMiniKit,
  useComposeCast,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import { RotateCcw, Download, Pin, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { minikitConfig } from "../minikit.config";
import { generateReceipt, getMaxReceiptLength } from "./receiptTemplates";
import { AppShell } from "./AppShell";
import styles from "./page.module.css";

const CARD_WIDTH = 1074;
const CARD_HEIGHT = 1474;

const TIP_URL =
  process.env.NEXT_PUBLIC_TIP_URL || "https://warpcast.com/myreceipt";

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

async function renderReceiptImage(
  text: string,
  _name: string
): Promise<string> {
  if (typeof document === "undefined") {
    // Guard kalau entah kenapa terpanggil di server
    return "";
  }

  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;

  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // Background putih
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // ============================
  // 1) HEADER: LOGO nota-inc.png
  // ============================
  try {
    const headerImg = new Image();
    headerImg.src = "/nota-inc.png";

    await new Promise<void>((resolve) => {
      headerImg.onload = () => resolve();
      headerImg.onerror = () => resolve();
    });

    const maxHeaderWidth = CARD_WIDTH * 0.47;
    const scale = Math.min(maxHeaderWidth / headerImg.width, 1);

    const headerWidth = headerImg.width * scale;
    const headerHeight = headerImg.height * scale;

    const headerX = (CARD_WIDTH - headerWidth) / 2;
    const headerY = 80;

    ctx.drawImage(headerImg, headerX, headerY, headerWidth, headerHeight);
  } catch (e) {
    console.error("Failed to load nota-inc.png header image", e);
    ctx.fillStyle = "#111111";
    ctx.font = "700 72px Menlo, ui-monospace, SFMono-Regular, monospace";
    ctx.fillText("Prof. NOTA Inc.", CARD_WIDTH / 2, 140);
  }

  // ============================
  // 2) Dots atas
  // ============================
  const topDotsY = 320;
  ctx.font = "40px Menlo, ui-monospace, SFMono-Regular, monospace";
  ctx.fillStyle = "#666666";
  ctx.fillText("...", CARD_WIDTH / 2, topDotsY);

  // ============================
  // 3) BODY: teks receipt (2 bagian)
  // ============================
  const bodyWidth = CARD_WIDTH * 0.7;
  const bodyLineHeight = 40 * 1.6;
  const blankGap = bodyLineHeight;

  ctx.fillStyle = "#111111";
  ctx.textAlign = "center";
  ctx.font = "40px Menlo, ui-monospace, SFMono-Regular, monospace";

  const [rawPart1, rawPart2] = text.split("\n\n");
  const part1 = rawPart1 || text;
  const part2 = rawPart2 || "";

  const linesPart1 = wrapText(ctx, part1, bodyWidth);
  const linesPart2 = part2 ? wrapText(ctx, part2, bodyWidth) : [];

  let y = topDotsY + blankGap;

  // Bagian pertama
  for (const line of linesPart1) {
    y += bodyLineHeight;
    ctx.fillText(line, CARD_WIDTH / 2, y);
  }

  // Blank line antar bagian
  if (linesPart2.length > 0) {
    y += blankGap;
  }

  // Bagian kedua
  for (const line of linesPart2) {
    y += bodyLineHeight;
    ctx.fillText(line, CARD_WIDTH / 2, y);
  }

  // ============================
  // 4) TAGLINE
  // ============================
  y += blankGap;

  const tagline = "— $MyReceipt for $ENDHONESA, $OiOi. —";
  ctx.font = "32px Menlo, ui-monospace, SFMono-Regular, monospace";
  const taglineLineHeight = 32 * 1.6;

  y += taglineLineHeight;
  ctx.fillText(tagline, CARD_WIDTH / 2, y);

  // ============================
  // 5) Dots bawah
  // ============================
  y += blankGap;
  ctx.font = "40px Menlo, ui-monospace, SFMono-Regular, monospace";
  ctx.fillStyle = "#666666";
  ctx.fillText("...", CARD_WIDTH / 2, y);

  // ============================
  // 6) AVATAR (nota-pfp.png) nempel di bawah card
  // ============================
  try {
    const avatarImg = new Image();
    avatarImg.src = "/nota-pfp.png";

    await new Promise<void>((resolve) => {
      avatarImg.onload = () => resolve();
      avatarImg.onerror = () => resolve();
    });

    const avatarSize = 474;
    const avatarX = CARD_WIDTH / 2 - avatarSize / 2;
    const avatarY = CARD_HEIGHT - avatarSize + 47;

    ctx.drawImage(avatarImg, avatarX, avatarY, avatarSize, avatarSize);
  } catch (e) {
    console.error("Failed to load nota-pfp.png avatar image", e);
  }

  return canvas.toDataURL("image/png");
}

export default function Home() {
  const { isFrameReady, setFrameReady, context } = useMiniKit();
  const { composeCastAsync } = useComposeCast();
  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();
  const router = useRouter();

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

  const [currentNota, setCurrentNota] = useState<string>("");
  const [nameUsed, setNameUsed] = useState<string>(displayName);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  // editorText: isi textarea yang bisa di-edit
  // renderText: isi yang sudah di-apply ke kartu & image
  const [editorText, setEditorText] = useState<string>("");
  const [renderText, setRenderText] = useState<string>("");
  const [isRendering, setIsRendering] = useState<boolean>(true);

  // Batas karakter textarea: pakai max length (nama 32 char)
  const textLimit = useMemo(
    () => getMaxReceiptLength(displayName),
    [displayName]
  );

  const hasChanges = useMemo(
    () => editorText.trim() !== renderText.trim(),
    [editorText, renderText]
  );

  // Mark Mini App ready
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [isFrameReady, setFrameReady]);

  // Generate receipt pertama kali & setiap nama berubah
  useEffect(() => {
    if (!currentNota || nameUsed !== displayName) {
      const next = generateReceipt(displayName);
      setCurrentNota(next);
      setNameUsed(displayName);

      // default textarea = template yang sedang dipakai
      setEditorText(next);
      // isi kartu & image = template ini juga
      setRenderText(next);

      setImageDataUrl(null);
      setIsRendering(true);
    }
  }, [displayName, currentNota, nameUsed]);

  // Render PNG berbasis renderText + displayName
  useEffect(() => {
    let cancelled = false;

    const makeImage = async () => {
      if (!renderText) return;
      setIsRendering(true);

      const url = await renderReceiptImage(renderText, displayName);

      if (!cancelled) {
        setImageDataUrl(url || "");
        setIsRendering(false);
      }
    };

    makeImage();

    return () => {
      cancelled = true;
    };
  }, [renderText, displayName]);

  const handleAnother = () => {
    const next = generateReceipt(displayName);
    setCurrentNota(next);
    setEditorText(next);
    setRenderText(next);
    setImageDataUrl(null);
    // isRendering akan di-set di effect renderText
  };

  const handleApplyEdits = () => {
    const trimmed = editorText.trim();
    // kalau kosong atau tidak ada perubahan → NO-OP
    if (!trimmed || !hasChanges) return;

    setRenderText(trimmed);
    setImageDataUrl(null);
    // isRendering akan di-set di effect renderText
  };

  const handleDownloadCard = () => {
    if (!imageDataUrl) return;
    if (typeof document === "undefined") return;

    const link = document.createElement("a");
    link.href = imageDataUrl;
    link.download = "myreceipt.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveMiniApp = async () => {
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
      setIsSharing(true);
      const textBody = renderText || currentNota;
      const text = `MyReceipt of Today:\n\n“${textBody}”\n\n— pulled from MyReceipt Mini App on Base as $MyReceipt for $ENDHONESA, $OiOi.`;

      const baseUrl =
        process.env.NEXT_PUBLIC_URL || "https://mini.endhonesa.com";

      const result = await composeCastAsync({
        text,
        embeds: [baseUrl],
      });

      if (result?.cast) {
        console.log("Cast created successfully:", result.cast.hash);
        router.push("/success");
      } else {
        console.log("User cancelled the cast");
      }
    } catch (error) {
      console.error("Error sharing cast:", error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleOpenStandalone = () => {
    if (!renderText && !currentNota) return;

    const displayText = renderText || currentNota;
    const origin = typeof window !== "undefined" ? window.location.origin : "";

    const url = `${origin}/open?text=${encodeURIComponent(
      displayText
    )}&name=${encodeURIComponent(displayName || "OiOi")}`;

    openUrl(url);
  };

  const handleTips = () => {
    try {
      openUrl(TIP_URL);
    } catch (error) {
      console.error("Error opening tips URL:", error);
    }
  };

  const displayText = renderText || currentNota;

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
        <div className={styles.actions}>
          <div className={styles.actionRow}>
            <button
              type="button"
              className={styles.iconButton}
              onClick={handleAnother}
              aria-label="Get another receipt."
            >
              <RotateCcw className={styles.iconGlyph} />
              <span className={styles.iconLabel}>Get</span>
            </button>

            <button
              type="button"
              className={styles.iconButton}
              onClick={handleTips}
              aria-label="Send tips to Prof. NOTA."
            >
              <Download className={styles.iconGlyph} />
              <span className={styles.iconLabel}>Tips</span>
            </button>

            <button
              type="button"
              className={styles.iconButton}
              onClick={handleSaveMiniApp}
              aria-label="Pin MyReceipt mini app."
            >
              <Pin className={styles.iconGlyph} />
              <span className={styles.iconLabel}>Pin</span>
            </button>

            <button
              type="button"
              className={`${styles.iconButton} ${styles.primaryAction}`}
              onClick={handleShare}
              disabled={isSharing}
              aria-label="Share receipt of today."
            >
              <Share2 className={styles.iconGlyph} />
              <span className={styles.iconLabel}>
                {isSharing ? "Sharing…" : "Share"}
              </span>
            </button>
          </div>
        </div>
      }
    >
      <>
        {/* Receipt card */}
        <div className={styles.notaCard}>
          {imageDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageDataUrl}
              alt={`MyReceipt for ${displayName}`}
              className={styles.notaImage}
            />
          ) : isRendering ? (
            <div className={styles.notaLoader}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/sphere.svg"
                alt="Loading receipt…"
                className={styles.notaLoaderImage}
              />
            </div>
          ) : (
            <p className={styles.notaText}>{displayText}</p>
          )}
        </div>

        {/* Editor + CTA atas (Update / Mint / Open image) */}
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
            onChange={(e) => setEditorText(e.target.value)}
          />

          <p className={styles.appendHint}>
            Start from this version, edit it, or add 1–2 more lines — then apply
            it to the card.
          </p>

          <div className={styles.appendActions}>
            {/* Update receipt */}
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={handleApplyEdits}
              disabled={!editorText.trim() || !hasChanges}
              aria-label="Apply your edits to the receipt card."
            >
              Update receipt
            </button>

            {/* Mint receipt (soon) — dummy & disabled */}
            <button
              type="button"
              className={styles.secondaryButton}
              disabled
              aria-label="Mint receipt (coming soon)."
            >
              Mint receipt (soon)
            </button>

            {/* Open as image */}
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={handleOpenStandalone}
              disabled={!displayText}
              aria-label="Open this receipt as a standalone image."
            >
              Open as image
            </button>
          </div>
        </section>
      </>
    </AppShell>
  );
}
