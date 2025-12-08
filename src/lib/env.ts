const DEFAULT_BASE_URL =
  process.env.NEXT_PUBLIC_URL || "https://mini.endhonesa.com";

const DEFAULT_TIP_URL =
  process.env.NEXT_PUBLIC_TIP_URL || "https://warpcast.com/myreceipt";

// NEW: ambil CAIP-19 $ENDHONESA dari env (biarkan kosong kalau belum di-set)
// NEW: token ID $ENDHONESA dalam format CAIP-19 (opsional)
const DEFAULT_ENDHONESA_TOKEN_ID =
  process.env.NEXT_PUBLIC_ENDHONESA_CAIP19 || "";

export function getBaseUrl(): string {
  return DEFAULT_BASE_URL;
}

export function getTipUrl(): string {
  return DEFAULT_TIP_URL;
}

// NEW: helper untuk $ENDHONESA
export function getEndhonesaTokenId(): string {
  return DEFAULT_ENDHONESA_TOKEN_ID;
}
