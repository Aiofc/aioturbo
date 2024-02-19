/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  async rewrites() {
    return [
      {
        source: "/gateway/:path*",
        destination: "http://127.0.0.1:9999/:path*", // Proxy to Backend
      },
    ];
  },
};
