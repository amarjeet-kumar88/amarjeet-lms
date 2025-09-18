import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "amarjeet-lms.fly.storage.tigris.dev",
        pathname: "**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;",
  },

  webpack: (config) => {
    config.watchOptions = {
      ignored: [
        "**/node_modules/**",
        "**/.git/**",
        "**/Application Data/**", // ✅ works cross-platform
        "**/AppData/**",          // ✅ extra ignore for Windows AppData
      ],
    };
    return config;
  },
};

export default nextConfig;
