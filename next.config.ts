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
        "C:/Users/amarj/Application Data/**", // 🚫 ignore protected folder
      ],
    };
    return config;
  },
};

export default nextConfig;
