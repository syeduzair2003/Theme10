import type { NextConfig } from "next";
// import withBundleAnalyzer from "@next/bundle-analyzer";

// const withAnalyzer = withBundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
// });
const nextConfig: NextConfig = {
// output: "standalone",
  reactStrictMode: false,
  trailingSlash: false,
  allowedDevOrigins: [
    'http://company1.local:3000',
    'http://company2.local:3000',
    'http://localhost:3000',
    'http://test-company.couponbase.local:3000',
    'http://gettopdiscounts.com:3000',
    'http://abbas-company.affiliatespublishers.com:3000',
    'http://saqib-company.affiliatespublishers.com:3000'
  ],
  turbopack: {
    resolveAlias: {
      underscore: 'lodash',
      mocha: { browser: 'mocha/browser-entry.js' },
      resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
    },
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
      },
      {
        protocol: 'http',
        hostname: '**',
        port: '3000',
      },
    ],
  },
};

// export default withAnalyzer(nextConfig);
export default nextConfig;
