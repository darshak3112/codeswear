/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  /*async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=0, must-revalidate, no-store, nocache, private',
          },
          {
			key: 'X-Content-Type-Options',
			value: 'nosniff',
		  },
		  {
			key: 'X-Frame-Options',
			value: 'DENY',
		  },
		  {
			key: 'X-XSS-Protection',
			value: '1; mode=block',
		  },
		  {
			key: 'Set-Cookie',
			value: 'path=/; samesite=lax; httponly',
		  },
        ],
      },
    ]
  },*/
}

module.exports = nextConfig
