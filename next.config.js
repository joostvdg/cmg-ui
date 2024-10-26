module.exports = {
  experimental: {
    outputStandalone: true,
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_CLASSIC_API_URL: process.env.NEXT_PUBLIC_CLASSIC_API_URL,
    NEXT_PUBLIC_CLASSIC_API_INTERNAL_URL: process.env.NEXT_PUBLIC_CLASSIC_API_INTERNAL_URL,
    NEXT_PUBLIC_SEAFARERS_API_URL: process.env.NEXT_PUBLIC_SEAFARERS_API_URL,
  },
  env: {
    NEXT_PUBLIC_CLASSIC_API_URL: process.env.NEXT_PUBLIC_CLASSIC_API_URL,
    NEXT_PUBLIC_CLASSIC_API_INTERNAL_URL: process.env.NEXT_PUBLIC_CLASSIC_API_INTERNAL_URL,
    NEXT_PUBLIC_SEAFARERS_API_URL: process.env.NEXT_PUBLIC_SEAFARERS_API_URL,
  },

  async redirects() {
    return [
      {
        source: '/6player',
        destination: 'https://map.cmg.joostvdg.net/6player',
        permanent: true
      },
      {
        source: '/4player',
        destination: 'https://map.cmg.joostvdg.net/4player',
        permanent: true
      },
      {
        source: '/scenarioa',
        destination: 'https://map.cmg.joostvdg.net/scenarioa',
        permanent: true
      },
      {
        source: '/feedback',
        destination: 'https://map.cmg.joostvdg.net/feedback',
        permanent: true
      }
    ];
  }
}