/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // إضافة خيار unoptimized لتجاوز خدمة تحسين الصور عندما تعمل في Docker
    unoptimized: process.env.DOCKER_ENV === "true",
    domains: ["i.ytimg.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
      // إضافة أنماط أكثر شمولاً للصور
      {
        protocol: "https",
        hostname: "**.ytimg.com",
      },
    ],
  },
  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript type checking during builds
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
