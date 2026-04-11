/** @type {import('next').NextConfig} */
const nextConfig = {
  // Security headers — applied to all routes
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent clickjacking — your site cannot be embedded in iframes
          { key: 'X-Frame-Options', value: 'DENY' },
          // Prevent MIME type sniffing attacks
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Enable browser XSS protection
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          // Control referrer information sent with requests
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Restrict permissions (no camera, microphone, etc.)
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // Force HTTPS
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
