import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hirecre.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Keep auth flows and short-link redirector out of the index.
        disallow: ["/api/", "/login", "/signup", "/alerts", "/r/"],
      },
    ],
    // Point Google at both sitemaps. app/sitemap.ts generates the
    // main one; app/jobs/sitemap.ts generates the jobs-only one.
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/jobs/sitemap.xml`],
    host: SITE_URL,
  };
}
