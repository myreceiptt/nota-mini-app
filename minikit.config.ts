const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/**
 * MiniApp configuration object. Must follow the Farcaster MiniApp specification.
 *
 * @see {@link https://miniapps.farcaster.xyz/docs/guides/publishing}
 */
export const minikitConfig = {
  // Sudah di-generate khusus untuk domain mini.endhonesa.com
  accountAssociation: {
    header:
      "eyJmaWQiOjUxNzc5OCwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDdlOUQzNUI5ZEI1REVhNjFGODVGNEYxNGY0Qzk3MmI3N0Q3NWE2NzQifQ",
    payload: "eyJkb21haW4iOiJtaW5pLmVuZGhvbmVzYS5jb20ifQ",
    signature:
      "4gQV838aFcU0nYVQtpO84hRY/jOIZ40mz/Mvpbbi/kVdVLloM58+WdfeZfKJ/0rKHR92JwOWzw1tdggB13w64Bw=",
  },

  baseBuilder: {
    ownerAddress: "0x35b68340C61F26147b7B22f5Ab931892BD9358B3",
  },

  // Bagian ini akan diubah jadi manifest "frame" oleh withValidManifest()
  miniapp: {
    version: "1",
    name: "MyReceipt",
    subtitle: "A small receipt to hold today.", // 30 chars ✅
    description:
      "MyReceipt is an experimental Mini App by Prof. NOTA that surfaces short reflective lines and small onchain receipts inside Base App and Farcaster.",

    screenshotUrls: [`${ROOT_URL}/screenshot.jpeg`],
    iconUrl: `${ROOT_URL}/icon.png`,
    imageUrl: `${ROOT_URL}/image.jpeg`,
    heroImageUrl: `${ROOT_URL}/hero.jpg`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#0a0b0d",

    buttonTitle: "Open a Receipt for Today",
    castShareUrl: `${ROOT_URL}/`,

    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,

    primaryCategory: "education",
    tags: ["myreceipt", "nota", "reflection", "education", "satusatusebelas"],

    tagline: "Your onchain receipt of today.",
    ogTitle: "MyReceipt",
    ogDescription:
      "Open MyReceipt on Base or Farcaster and pull a short line as your onchain receipt of the day.", // 100 chars ✅
    ogImageUrl: `${ROOT_URL}/og.png`,
    noindex: false,
  },
} as const;
