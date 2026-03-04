import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = "https://hirecre.com";

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabaseClient = supabase();

  const { data } = await supabaseClient
    .from("jobs")
    .select("slug,last_seen_at")
    .eq("is_active", true)
    .not("slug", "is", null)
    .limit(50000);

  if (!data) return [];

  return data.map((job) => ({
    url: `${SITE_URL}/jobs/${job.slug}`,
    lastModified: job.last_seen_at
      ? new Date(job.last_seen_at)
      : new Date(),
    changeFrequency: "daily",
    priority: 0.6,
  }));
}
