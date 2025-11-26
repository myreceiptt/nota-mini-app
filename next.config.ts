// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/.well-known/farcaster.json",
  //       destination:
  //         "https://api.farcaster.xyz/miniapps/hosted-manifest/019abb52-a6a4-77a1-96dd-f826b9a3b1fa",
  //       permanent: false,
  //     },
  //   ];
  // },
};

export default nextConfig;
