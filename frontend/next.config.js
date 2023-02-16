/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_HOST: process.env.API_HOST || 'http://localhost:8000/api/v1',
    API_HOST_LOCAL: 'http://localhost:8000/api/v1',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: (process.env.API_HOST || 'http://localhost:8000/api/v1') + '/:path*/',
      },
    ]
  },
};

module.exports = nextConfig;
