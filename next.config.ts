import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, 
  swcMinify: true, 
  images: {
    domains: ["example.com"], 
  },
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL, 
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"], 
    });

    return config;
  },
};

export default nextConfig;
