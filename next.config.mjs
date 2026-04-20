/** @type {import('next').NextConfig} */

// Baseline security headers applied to every response.
// Coolify's Traefik terminates TLS, so HSTS is safe to set here.
// CSP is intentionally left off for now — the site loads Google
// Tag Manager, AdSense, and inline <script> JSON-LD blocks, each of
// which needs explicit allowlisting. Add a report-only CSP in a
// follow-up once those sources are enumerated.
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig = {
  reactStrictMode: true,

  // Smaller Docker images and faster Coolify redeploys. Once a Dockerfile
  // is added, it should COPY .next/standalone, .next/static, and public.
  output: "standalone",

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
