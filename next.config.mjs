/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/clients',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
