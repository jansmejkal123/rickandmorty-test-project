const { i18n } = require('./next-i18next.config')


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        port: '',
        pathname: '/api/character/avatar/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/episodes',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
