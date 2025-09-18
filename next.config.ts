import type { NextConfig } from "next";
//@ts-ignore
import  PrismaPlugin from "@prisma/nextjs-monorepo-workaround-plugin";

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

  webpack: (config, {isServer}) => {
    if(isServer)
    config.plugin = [...config.plugins, new PrismaPlugin()];
  },
};

export default nextConfig;
