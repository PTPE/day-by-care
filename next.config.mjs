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
  serverActions: {
    bodySizeLimit: '200mb',
  },
};

export default nextConfig;
