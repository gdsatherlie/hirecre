// app/jobs/sitemap.ts
import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hirecre.com";

function supaPublic() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
}

function stripHtml(html: string) {
  return String(html || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Keep it conservative — only sitemap pages that look “real”
function shouldIndexJob(j: {
  title: string | null;
  company: string | null;
  source_company: string | null;
  url: string | null;
  description_text: string | null;
  description: string | null;
  is_active: boolean | null;
}) {
  if (!j.is_active) return false;

  const titleOk = (j.title || "").trim().length >= 5;
  const companyOk = (j.company || j.source_company || "").trim().length >= 2;
  const urlOk = !!(j.url && /^https?:\/\//i.test(j.url));

  const text = (j.description_text || stripHtml(j.description || "") || "").trim();
  const descOk = text.length >= 250;

  return titleOk && companyOk && urlOk && descOk;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = supaPublic();

  // Pull only the columns we need (fast)
  const { data, error } = await supabase
    .from("jobs")
    .select("slug,title,company,source_company,url,description,description_text,is_active,posted_at,last_seen_at")
    .eq("is_active", true)
    .not("slug", "is", null)
    .limit(50000); // safety cap

  if (error) {
    // If RLS blocks this, your board probably also breaks logged-out.
    // Return empty sitemap rather than crashing builds.
    return [];
  }

  const now = new Date();

  const rows = (data || [])
    .filter((j) => j.slug && shouldIndexJob(j))
    .map((j) => {
      const lastMod = j.last_seen_at || j.posted_at;
      return {
        url: `${SITE_URL}/jobs/${j.slug}`,
        lastModified: lastMod ? new Date(lastMod) : now,
        changeFrequency: "daily" as const,
        priority: 0.6,
      };
    });

  return rows;
}
