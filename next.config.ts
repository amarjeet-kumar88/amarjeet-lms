import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "amarjeet-lms.fly.storage.tigris.dev",
        port: "", // can be omitted if default (443)
        pathname: "**", // important to match all image paths
      },
    ],
    dangerouslyAllowSVG: true, // 🔥 this enables remote SVGs
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // (optional) tighten security
  },
};

export default nextConfig;
