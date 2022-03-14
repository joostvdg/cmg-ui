module.exports = {
  experimental: {
    outputStandalone: true,
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_CLASSIC_API_URL: process.env.NEXT_PUBLIC_CLASSIC_API_URL,
    NEXT_PUBLIC_SEAFARERS_API_URL: process.env.NEXT_PUBLIC_SEAFARERS_API_URL,
  },
  env: {
    NEXT_PUBLIC_CLASSIC_API_URL: process.env.NEXT_PUBLIC_CLASSIC_API_URL,
    NEXT_PUBLIC_SEAFARERS_API_URL: process.env.NEXT_PUBLIC_SEAFARERS_API_URL,
  }
}