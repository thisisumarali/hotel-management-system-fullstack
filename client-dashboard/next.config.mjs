/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },

      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },

    ],
    dangerouslyAllowSVG: true
  }
};

export default nextConfig;
