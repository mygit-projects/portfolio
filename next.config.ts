import path from "path";
import type { NextConfig } from "next";

const modernPolyfill = path.join(__dirname, "src/lib/modern-polyfill.js");

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "../build/polyfills/polyfill-module": "./src/lib/modern-polyfill.js",
      "next/dist/build/polyfills/polyfill-module": "./src/lib/modern-polyfill.js",
    },
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "../build/polyfills/polyfill-module": modernPolyfill,
      "next/dist/build/polyfills/polyfill-module": modernPolyfill,
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
