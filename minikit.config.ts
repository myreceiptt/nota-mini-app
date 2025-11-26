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

  // Bagian ini akan diubah jadi manifest "frame" oleh withValidManifest()
  miniapp: {
    version: "1",
    name: "NOTA Mini App",
    subtitle: "A small NOTA to hold your day.",
    description:
      "An experimental NOTA Mini App by Prof. NOTA that surfaces short reflective lines and small onchain receipts inside Base and Farcaster.",

    // Sesuaikan dengan file yang memang ada di /public
    screenshotUrls: [`${ROOT_URL}/screenshot.jpeg`],
    iconUrl: `${ROOT_URL}/icon.png`,
    imageUrl: `${ROOT_URL}/image.jpeg`,
    heroImageUrl: `${ROOT_URL}/hero.jpg`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#0a0b0d",

    buttonTitle: "Open NOTA Mini App",
    castShareUrl: `${ROOT_URL}/`,

    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,

    primaryCategory: "education",
    tags: ["nota", "reflection", "base", "prof-nota"],

    tagline: "Your small daily NOTA on Base.",
    ogTitle: "NOTA Mini App",
    ogDescription:
      "Open the NOTA Mini App on Base and pull a short line as your onchain receipt of the day.",
    ogImageUrl: `${ROOT_URL}/og.png`,
  },

  baseBuilder: {
    ownerAddress: "0x35b68340C61F26147b7B22f5Ab931892BD9358B3",
  },
} as const;
