import type { NextConfig } from "next";

// GitHub Pages 배포 시 NEXT_PUBLIC_BASE_PATH="/faan-specbook" 로 빌드한다.
// Vercel 등 루트 배포에서는 비워 둔다.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
