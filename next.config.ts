import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/how-it-works",
        destination: "/flow",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
