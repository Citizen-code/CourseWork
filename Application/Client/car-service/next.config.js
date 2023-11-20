/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: "http",
        hostname: '185.252.146.21'
      }
    ],
  },
  env:{
    BASE_URL:process.env.NEXT_PUBLIC_BASE_URL
  },
  reactStrictMode:false
}

module.exports = nextConfig
