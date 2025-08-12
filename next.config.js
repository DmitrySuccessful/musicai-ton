```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'oaidalleapiprodscus.blob.core.windows.net',
      'cdn.openai.com',
      'replicate.delivery',
      'suno.ai',
      'udio.com',
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://*.telegram.org https://web.telegram.org",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```
