// import { withValidManifest } from "@coinbase/onchainkit/minikit";
// import { minikitConfig } from "../../../minikit.config";

// export const dynamic = "force-static";

// export async function GET() {
//   return Response.json(withValidManifest(minikitConfig));
// }

import { withValidManifest } from "@coinbase/onchainkit/minikit";
import { minikitConfig } from "../../../minikit.config";

export async function GET() {
  const manifest = withValidManifest(minikitConfig);

  return Response.json({
    // output dari OnchainKit (accountAssociation + miniapp + apapun yang dia jaga)
    ...manifest,
    // pastikan baseBuilder SELALU ikut (kalau sudah ada pun, ini sekadar meng-override dengan value di config)
    baseBuilder: minikitConfig.baseBuilder,
  });
}
