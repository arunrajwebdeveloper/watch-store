import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.casio.com", // e.g., "images.unsplash.com"
        port: "",
        pathname: "/**", // allow all paths
      },
      {
        protocol: "https",
        hostname: "cdn1.ethoswatches.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:6000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
