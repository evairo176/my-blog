/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
      {
        hostname: "directus-production-0d91.up.railway.app",
        protocol: "https",
      },
    ],
  },
  //   experimental: {
  //     serverActions: true,
  //   },
};

module.exports = nextConfig;
