import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    // The site is capped at max-w-7xl; a 3840px candidate only wastes bytes.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
  async redirects() {
    return [
      { source: "/collections", destination: "/products", permanent: true },
      { source: "/es/collections", destination: "/es/products", permanent: true },
      { source: "/ar/collections", destination: "/ar/products", permanent: true },
    ];
  },
};

export default nextConfig;
