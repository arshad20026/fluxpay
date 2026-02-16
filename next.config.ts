import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export',
  images: {
    unoptimized: true,
  },
  // @ts-expect-error - Turbopack root is Next.js 16 specific config
  turbopack: {
    root: '.',
  },
  experimental: {
    // next.config.ts keys
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },
};

export default nextConfig;
