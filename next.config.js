// next.config.js
export async function headers() {
  return [
    {
      source: '/terms',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable', // Cache for 1 year
        },
      ],
    },
    {
      source: '/general',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable', // Cache for 1 year
        },
      ],
    },
    {
      source: '/register-error',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable', // Cache for 1 year
        },
      ],
    },
    {
      source: '/about-us',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable', // Cache for 1 year
        },
      ],
    },
    {
      source: '/',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable', // Cache for 1 year
        },
      ],
    },
    {
      source: '/privacy-policy',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable', // Cache for 1 year
        },
      ],
    },
    {
      source: '/disclaimer',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable', // Cache for 1 year
        },
      ],
    },
  ];
}