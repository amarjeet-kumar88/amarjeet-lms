import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "amarjeet-lms.fly.storage.tigris.dev",
        port: "",
        pathname: "**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // 👇 yaha fix add kiya
  webpack: (config) => {
    config.watchOptions = {
      ignored: [
        "**/node_modules/**",
        "**/.git/**",
        "C:/Users/amarj/Application Data/**", // prevent EPERM error
      ],
    };
    return config;
  },
};

export default nextConfig;
