/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || (process.env.GITHUB_ACTIONS ? '/Portfolio' : ''),
  reactStrictMode: true,
  transpilePackages: ['three'],
};

export default nextConfig;
