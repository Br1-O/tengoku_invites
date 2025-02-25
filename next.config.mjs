/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export", // Ensures full static export
  experimental: {
    appDir: true, // Keep if using App Router
  },
};

export default nextConfig;
