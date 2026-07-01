import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/adhdsystem",
        destination: "/focus",
        permanent: true,
      },
      {
        source: "/focussystem",
        destination: "/focus",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
