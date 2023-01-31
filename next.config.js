/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
