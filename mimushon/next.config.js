/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't advertise the framework in response headers
  poweredByHeader: false,
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: [
          // Prevent the site from being embedded in iframes (clickjacking)
          { key: "X-Frame-Options", value: "DENY" },
          // Prevent browsers from MIME-sniffing the content type
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Control what referrer information is sent
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Restrict access to sensitive browser features
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          // Enforce HTTPS for 2 years (only active in production)
          ...(process.env.NODE_ENV === "production"
            ? [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=63072000; includeSubDomains; preload",
                },
              ]
            : []),
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Scripts: own origin + GTM + GA + jsDelivr (accessibility widget)
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.jsdelivr.net",
              // Styles: own origin + inline (needed by Tailwind/Next.js)
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Fonts: own origin + Google Fonts
              "font-src 'self' https://fonts.gstatic.com data:",
              // Images: own origin + data URIs + any HTTPS source (for og images etc.)
              "img-src 'self' data: https:",
              // API calls: own origin + GA
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com",
              // Frames: only GTM noscript iframe
              "frame-src https://www.googletagmanager.com",
              // Forbid this page from being framed anywhere
              "frame-ancestors 'none'",
              // Only load media from own origin
              "media-src 'self'",
              // Block all plugins (Flash, etc.)
              "object-src 'none'",
              // Force HTTPS for all loaded resources
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
