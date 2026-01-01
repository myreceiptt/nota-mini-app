"use client";

const CARD_WIDTH = 1074;
const CARD_HEIGHT = 1474;

type RenderReceiptInput = {
  text: string;
  receiptId: number;
  creator: string;
  createdAtLabel: string;
  pfpSrc: string;
};

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = () => resolve(img);
  });

import { shortenAddress } from "@/lib/formatters";

const wrapText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
) => {
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
};

export async function renderReceiptImage({
  text,
  receiptId,
  creator,
  createdAtLabel,
  pfpSrc,
}: RenderReceiptInput): Promise<string> {
  if (typeof document === "undefined") return "";

  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;

  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  try {
    const headerImg = await loadImage("/nota-inc.png");
    const maxHeaderWidth = CARD_WIDTH * 0.47;
    const scale = Math.min(maxHeaderWidth / headerImg.width, 1);

    const headerWidth = headerImg.width * scale;
    const headerHeight = headerImg.height * scale;
    const headerX = (CARD_WIDTH - headerWidth) / 2;
    const headerY = 80;

    ctx.drawImage(headerImg, headerX, headerY, headerWidth, headerHeight);
  } catch (err) {
    console.error("Failed to load nota-inc.png header image", err);
    ctx.fillStyle = "#111111";
    ctx.font = "700 72px Menlo, ui-monospace, SFMono-Regular, monospace";
    ctx.fillText("Prof. NOTA Inc.", CARD_WIDTH / 2, 140);
  }

  const topDotsY = 320;
  ctx.font = "40px Menlo, ui-monospace, SFMono-Regular, monospace";
  ctx.fillStyle = "#666666";
  ctx.fillText("...", CARD_WIDTH / 2, topDotsY);

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

  y += blankGap;
  ctx.fillStyle = "#111111";
  ctx.font = "28px Menlo, ui-monospace, SFMono-Regular, monospace";
  const metaLineHeight = 28 * 1.5;

  const creatorShort = shortenAddress(creator);
  const metaLines = [
    `RECEIPT #: ${receiptId}`,
    `Date: ${createdAtLabel}`,
    `Creator: ${creatorShort}`,
  ];

  for (const line of metaLines) {
    y += metaLineHeight;
    ctx.fillText(line, CARD_WIDTH / 2, y);
  }

  y += blankGap;
  ctx.font = "40px Menlo, ui-monospace, SFMono-Regular, monospace";
  ctx.fillStyle = "#666666";
  ctx.fillText("...", CARD_WIDTH / 2, y);

  try {
    const avatarImg = await loadImage(pfpSrc);
    const avatarSize = 474;
    const avatarX = CARD_WIDTH / 2 - avatarSize / 2;
    const avatarY = CARD_HEIGHT - avatarSize + 47;
    ctx.drawImage(avatarImg, avatarX, avatarY, avatarSize, avatarSize);
  } catch (err) {
    console.error("Failed to load nota-pfp.png avatar image", err);
  }

  return canvas.toDataURL("image/png");
}
