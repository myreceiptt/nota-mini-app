import { RECEIPT_TEMPLATES, type TemplateFn } from "./lib/receiptTemplates.data";

export type { TemplateFn };

export function generateReceipt(rawName?: string | null): string {
  const safeName =
    rawName && rawName.trim().length > 0 ? rawName.trim() : "OiOi";

  const idx = Math.floor(Math.random() * RECEIPT_TEMPLATES.length);
  return RECEIPT_TEMPLATES[idx](safeName);
}

export function getMaxReceiptLength(_rawName?: string | null): number {
  const dummyName = "12345678901234567890123456789012"; // 32 karakter

  const max = RECEIPT_TEMPLATES.reduce((currentMax, template) => {
    // Hitung panjang receipt dengan nama sepanjang 32 karakter
    const len = template(dummyName).length;
    return len > currentMax ? len : currentMax;
  }, 0);

  return max;
}
