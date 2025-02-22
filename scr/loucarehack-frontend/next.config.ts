/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  distDir: 'out',    // Output directory
  images: {
    unoptimized: true // Required for static export
  },
  trailingSlash: true, // Recommended for static exports
};

module.exports = nextConfig;
