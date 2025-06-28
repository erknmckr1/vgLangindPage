import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpackDevMiddleware: (config: {
    watchOptions: {
      poll: number; // her 1 saniyede bir değişiklik kontrolü
      aggregateTimeout: number;
    };
  }) => {
    config.watchOptions = {
      poll: 2000, // her 1 saniyede bir değişiklik kontrolü
      aggregateTimeout: 300, // değişiklik sonrası derleme gecikmesi
    };
    return config;
  },
};

export default nextConfig;
