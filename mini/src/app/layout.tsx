import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { minikitConfig } from "../../minikit.config";
import { SafeArea } from "@coinbase/onchainkit/minikit";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { RootProvider } from "@/components/RootProvider";
import "@coinbase/onchainkit/styles.css";
import "./globals.css";

// generateMetadata
// -----------------
// Default metadata for the Mini App, including fc:frame
// that Farcaster reads from the HTML head.
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: minikitConfig.miniapp.name,
    description: minikitConfig.miniapp.description,
    other: {
      "fc:frame": JSON.stringify({
        version: minikitConfig.miniapp.version,
        imageUrl: minikitConfig.miniapp.heroImageUrl,
        button: {
          title: `Open ${minikitConfig.miniapp.name}`,
          action: {
            name: `Launch ${minikitConfig.miniapp.name}`,
            type: "launch_frame",
          },
        },
      }),
    },
  };
}

// RootLayout
// ----------
// - Wraps everything with OnchainKit (RootProvider).
// - Uses SafeArea so UI stays within Mini App safe bounds.
// - Attaches Inter + Source Code Pro to <body>.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black">
        <RootProvider>
          <SafeArea>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1 bg-white">
                <div className="mx-auto w-full max-w-5xl px-4 py-10">
                  {children}
                </div>
              </main>
              <Footer />
            </div>
          </SafeArea>
        </RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
