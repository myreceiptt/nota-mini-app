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

  miniapp: {
    version: "1",
    name: "$MyReceipt",
    subtitle: "On-chain receipt of life.", // 30 chars ✅
    description:
      "$MyReceipt of Life - $MyReceipt Mini App starting from an experimental Mini App for the Base app and Farcaster, and an experimental Web App on the Stacks blockchain, built by Prof. NOTA as a sandbox for playful and reflective onchain experiences.",

    screenshotUrls: [
      `${ROOT_URL}/screenshot1.png`,
      `${ROOT_URL}/screenshot2.png`,
      `${ROOT_URL}/screenshot3.png`,
    ],
    iconUrl: `${ROOT_URL}/icon.png`,
    imageUrl: `${ROOT_URL}/image.jpeg`,
    heroImageUrl: `${ROOT_URL}/hero.jpg`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#0a0b0d",

    buttonTitle: "Open a Receipt for Today",
    castShareUrl: `${ROOT_URL}/`,

    homeUrl: ROOT_URL,
    canonicalDomain: "mini.endhonesa.com",
    webhookUrl: `${ROOT_URL}/api/webhook`,

    primaryCategory: "education",
    tags: ["receipt", "nota", "reflection", "vibes", "duaempattujuhempat"],

    tagline: "Your onchain receipt of life.",
    ogTitle: "$MyReceipt",
    ogDescription:
      "Open $MyReceipt, write and stamp, also mint an NFT for your on-chain receipt of life.", // 100 chars ✅
    ogImageUrl: `${ROOT_URL}/og.png`,
    noindex: false,
  },
} as const;
