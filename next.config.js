/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    
    return config;
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images : {
    remotePatterns : [
      {
        protocol : 'https',
        hostname : 'wp.nettyworth.io'
      },
      {
        protocol : 'https',
        hostname : 's2.coinmarketcap.com'
      },
      {
        protocol : 'https',
        hostname : 'media.graphassets.com'
      }
    ],
    formats : ['image/avif','image/webp']
  },
  i18n : {
    locales: ['en'],
    defaultLocale: 'en',
  },
}

module.exports = nextConfig