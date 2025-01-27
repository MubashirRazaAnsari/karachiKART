/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
    unoptimized: true,
    domains: [
      'cdn.sanity.io',
      'lh3.googleusercontent.com',
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Request-Timeout',
            value: '60', // Timeout in seconds
          },
          {
            key: 'Connection',
            value: 'keep-alive',
          },
        ],
      },
    ];
  },
  output: 'standalone',
  experimental: {
    serverActions: true,
  }
}

module.exports = nextConfig 