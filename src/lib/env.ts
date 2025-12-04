const DEFAULT_BASE_URL =
  process.env.NEXT_PUBLIC_URL || "https://mini.endhonesa.com";

const DEFAULT_TIP_URL =
  process.env.NEXT_PUBLIC_TIP_URL || "https://warpcast.com/myreceipt";

export function getBaseUrl(): string {
  return DEFAULT_BASE_URL;
}

export function getTipUrl(): string {
  return DEFAULT_TIP_URL;
}
