import { withValidManifest } from "@coinbase/onchainkit/minikit";
import { minikitConfig } from "../../../minikit.config";

export const dynamic = "force-static";

export async function GET() {
  return Response.json(withValidManifest(minikitConfig));
}
