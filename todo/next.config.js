/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL:'http://localhost:3000/api/todo'
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/api/auth/signin',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
