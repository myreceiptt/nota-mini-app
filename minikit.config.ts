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
  // 👉 diambil dari hosted manifest Farcaster
  accountAssociation: {
    header:
      "eyJmaWQiOjUxNzc5OCwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDdlOUQzNUI5ZEI1REVhNjFGODVGNEYxNGY0Qzk3MmI3N0Q3NWE2NzQifQ",
    payload:
      "eyJkb21haW4iOiJuZXctbWluaS1hcHAtcXVpY2tzdGFydC10aHJlZS1kZWx0YS52ZXJjZWwuYXBwIn0",
    signature:
      "ofQQmDdj1R4UA7eVEmYfu6Xp/WjJWCZOAc4u6RYMwtcaQIBUqkTcGkFiJUuVGhlul0qx3oGqJUGdCD+7QC5pVBw=",
  },

  // 👉 bagian ini yang akan diubah jadi manifest "frame" oleh withValidManifest()
  miniapp: {
    version: "1",
    name: "NOTA Mini App",
    subtitle: "Playful NOTA-style reflections on Base & Farcaster",
    description:
      "An experimental NOTA Mini App by Prof. NOTA that surfaces short reflective lines and small onchain experiences inside Base and Farcaster.",

    // sesuaikan dengan file di /public.
    // Kalau kamu punya icon.png / image.png / splash.png, pakai pola ini:
    screenshotUrls: [`${ROOT_URL}/image.png`],
    iconUrl: `${ROOT_URL}/icon.png`,
    imageUrl: `${ROOT_URL}/image.png`,
    heroImageUrl: `${ROOT_URL}/image.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#111111",

    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,

    primaryCategory: "education",
    tags: ["nota", "reflection", "education", "experimental"],

    tagline: "",
    ogTitle: "NOTA Mini App",
    ogDescription:
      "A small experimental NOTA Mini App running on Base and Farcaster.",
    ogImageUrl: `${ROOT_URL}/image.png`,
  },
} as const;
