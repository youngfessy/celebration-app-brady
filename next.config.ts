

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Important for static export
  basePath: '/brady-celerbation-app', // Replace with your actual GitHub repo name
  trailingSlash: true, // GitHub Pages requires trailing slashes
};

export default nextConfig;
