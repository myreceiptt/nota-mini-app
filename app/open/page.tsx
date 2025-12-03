"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "../page.module.css";

const CARD_WIDTH = 1074;
const CARD_HEIGHT = 1474;

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

  // HEADER: LOGO nota-inc.png
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

  // Dots atas
  const topDotsY = 320;
  ctx.font = "40px Menlo, ui-monospace, SFMono-Regular, monospace";
  ctx.fillStyle = "#666666";
  ctx.fillText("...", CARD_WIDTH / 2, topDotsY);

  // BODY teks
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

  for (const line of linesPart1) {
    y += bodyLineHeight;
    ctx.fillText(line, CARD_WIDTH / 2, y);
  }

  if (linesPart2.length > 0) {
    y += blankGap;
  }

  for (const line of linesPart2) {
    y += bodyLineHeight;
    ctx.fillText(line, CARD_WIDTH / 2, y);
  }

  // TAGLINE
  y += blankGap;

  const tagline = "— $MyReceipt for $ENDHONESA, $OiOi. —";
  ctx.font = "32px Menlo, ui-monospace, SFMono-Regular, monospace";
  const taglineLineHeight = 32 * 1.6;

  y += taglineLineHeight;
  ctx.fillText(tagline, CARD_WIDTH / 2, y);

  // Dots bawah
  y += blankGap;
  ctx.font = "40px Menlo, ui-monospace, SFMono-Regular, monospace";
  ctx.fillStyle = "#666666";
  ctx.fillText("...", CARD_WIDTH / 2, y);

  // AVATAR
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

export default function OpenReceiptPage() {
  const searchParams = useSearchParams();
  const text = searchParams.get("text") ?? "";
  const name = searchParams.get("name") ?? "OiOi";

  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState<boolean>(true);
  const [copyStatus, setCopyStatus] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    const makeImage = async () => {
      if (!text) {
        setIsRendering(false);
        return;
      }

      setIsRendering(true);
      const url = await renderReceiptImage(text, name);

      if (!cancelled) {
        setImageDataUrl(url || "");
        setIsRendering(false);
      }
    };

    makeImage();

    return () => {
      cancelled = true;
    };
  }, [text, name]);

  const handleCopyImage = async () => {
    if (!imageDataUrl) return;

    try {
      if (
        typeof navigator === "undefined" ||
        !(navigator as any).clipboard ||
        typeof (window as any).ClipboardItem === "undefined"
      ) {
        setCopyStatus("Copy image is not supported in this browser.");
        return;
      }

      const response = await fetch(imageDataUrl);
      const blob = await response.blob();
      const ClipboardItemCtor = (window as any).ClipboardItem;
      const item = new ClipboardItemCtor({ [blob.type]: blob });
      await (navigator as any).clipboard.write([item]);

      setCopyStatus("Image copied to clipboard.");
    } catch (error) {
      console.error("Failed to copy image:", error);
      setCopyStatus("Failed to copy image.");
    }
  };

  const handleDownloadImage = () => {
    if (!imageDataUrl) return;
    if (typeof document === "undefined") return;

    const link = document.createElement("a");
    link.href = imageDataUrl;
    link.download = "myreceipt.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!text) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.shell}>
            <h1 className={styles.title}>MyReceipt image</h1>
            <p className={styles.subtitle}>
              No receipt text was provided. Please open this page from the
              MyReceipt Mini App.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.shell}>
          <h1 className={styles.title}>MyReceipt image</h1>

          <p className={styles.subtitle}>
            Long-press the image to save it, or use the buttons below to copy or
            download this receipt.
          </p>

          <div className={styles.notaCard}>
            {imageDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageDataUrl}
                alt="MyReceipt"
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
              <p className={styles.notaText}>{text}</p>
            )}
          </div>

          {copyStatus && (
            <p className={styles.appendHint} style={{ marginTop: "0.5rem" }}>
              {copyStatus}
            </p>
          )}

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handleCopyImage}
            disabled={!imageDataUrl}
          >
            Copy image to clipboard
          </button>

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handleDownloadImage}
            disabled={!imageDataUrl}
          >
            Save image
          </button>
        </div>
      </div>
    </div>
  );
}
