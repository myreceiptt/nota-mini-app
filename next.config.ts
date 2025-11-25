/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Ensure externals exists and is an array
    if (!config.externals) {
      config.externals = [];
    }

    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },

  async redirects() {
    return [
      {
        source: "/.well-known/farcaster.json",
        destination:
          "https://api.farcaster.xyz/miniapps/hosted-manifest/019abb52-a6a4-77a1-96dd-f826b9a3b1fa",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
