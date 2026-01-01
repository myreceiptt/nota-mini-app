import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SafeArea } from "@coinbase/onchainkit/minikit";
import { minikitConfig } from "../../minikit.config";
import { RootProvider } from "@/components/RootProvider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "@/styles/globals.css";
import "@coinbase/onchainkit/styles.css";

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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

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
    <RootProvider>
      <html lang="en">
        <body
          className={`${inter.variable} ${sourceCodePro.variable} min-h-screen bg-white text-black`}
        >
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
          <Analytics />
        </body>
      </html>
    </RootProvider>
  );
}
