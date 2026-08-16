import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Empêche Turbopack de remonter vers C:\Users\artkl (home git + package-lock)
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
