/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Makes all pages static by default
  experimental: {
    appDir: true, // If you're using the app router
  },
};

export default nextConfig;