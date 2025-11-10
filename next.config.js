/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      // Redirect all instructor routes to Lillian Hahn Shining
      {
        source: '/instructor/:slug',
        destination: '/instructor/lillian-hahn-shining',
        permanent: false,
      },
      {
        source: '/instructors/:path*',
        destination: '/instructor/lillian-hahn-shining',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig