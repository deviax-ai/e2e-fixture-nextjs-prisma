/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Smaller, container-friendly runtime. Real Next.js+Prisma starters
  // ship this on by default; vibe-coded apps often inherit it from
  // create-next-app templates.
  output: "standalone",
};

module.exports = nextConfig;
