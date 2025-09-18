import type { NextConfig } from "next";
//@ts-ignore
import * as PrismaPlugin from '@prisma/nextjs-monorepo-workaround-plugin';


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

   webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push(PrismaPlugin()); // new नहीं लगाएं, सीधे function call करें
    }
    return config;
  },
};

export default nextConfig;
