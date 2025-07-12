import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;
