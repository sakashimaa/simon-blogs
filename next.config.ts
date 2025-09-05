import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "3mf4za90ic.ufs.sh",
        port: "",
      },
    ],
  },
};

export default nextConfig;
