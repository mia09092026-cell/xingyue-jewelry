import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/collections", destination: "/products", permanent: true },
      { source: "/es/collections", destination: "/es/products", permanent: true },
      { source: "/ar/collections", destination: "/ar/products", permanent: true },
    ];
  },
};

export default nextConfig;
