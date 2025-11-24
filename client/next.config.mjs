/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.100.31",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "192.168.111.144",
        port: "5000",
        pathname: "/uploads/**",
      },

    ],
    dangerouslyAllowSVG: true
  }
};

export default nextConfig;
