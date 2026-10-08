import type { NextConfig } from "next";
const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Prevents serverless build errors on native modules
  serverExternalPackages: ["better-sqlite3"],
  // Keep builds fast on Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};
export default config;