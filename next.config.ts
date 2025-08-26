import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",               // when frontend calls /api/...
        destination: "https://talenthub-api-1.onrender.com/:path*", // proxy to backend
      },
    ];
  },
};

export default nextConfig;
