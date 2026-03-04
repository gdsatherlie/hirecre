// app/jobs/[slug]/page.tsx
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Job = {
  slug: string;
  source: string | null;
  source_company: string | null;
  source_job_id: string | null;

  title: string | null;
  company: string | null;

  location_city: string | null;
  location_state: string | null;
  location_raw: string | null;

  url: string | null;

  posted_at: string | null;
  last_seen_at: string | null;
  is_active: boolean | null;

  description: string | null; // may be html or text depending on source
  description_text: string | null; // sometimes NOT plain text (can still contain html)
  has_pay: boolean | null;
  pay_extracted: string | null;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hirecre.com";

function supaAdmin() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
}

/** Minimal entity decode (enough for job descriptions) */
function decodeEntities(s: string) {
  return String(s || "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/");
}

/**
 * Convert HTML-ish content into readable text while preserving structure:
 * - headings become "Header:\n"
 * - list items become "• item"
 * - <br>/<p>/<div> become line breaks
 */
function htmlToReadableText(input: string) {
  let html = decodeEntities(String(input || ""));

  // strip script/style blocks
  html = html.replace(/<script[\s\S]*?<\/script>/gi, " ");
  html = html.replace(/<style[\s\S]*?<\/style>/gi, " ");

  // normalize common block tags into newlines
  html = html.replace(/<\/(p|div|section|article|header|footer|blockquote)>/gi, "\n\n");
  html = html.replace(/<(p|div|section|article|header|footer|blockquote)[^>]*>/gi, "");

  // headings -> newline + text + newline
  html = html.replace(/<h[1-6][^>]*>/gi, "\n\n");
  html = html.replace(/<\/h[1-6]>/gi, ":\n");

  // line breaks
  html = html.replace(/<br\s*\/?>/gi, "\n");

  // list items -> bullet lines
  html = html.replace(/<li[^>]*>/gi, "\n• ");
  html = html.replace(/<\/li>/gi, "");
  html = html.replace(/<\/?(ul|ol)[^>]*>/gi, "\n");

  // links: keep anchor text, drop href
  html = html.replace(/<a [^>]*>/gi, "");
  html = html.replace(/<\/a>/gi, "");

  // strong/em -> keep text only
  html = html.replace(/<\/?(strong|b|em|i|u|span)[^>]*>/gi, "");

  // remove any remaining tags
  html = html.replace(/<[^>]+>/g, " ");

  // cleanup whitespace
  html = html.replace(/[ \t]+\n/g, "\n");
  html = html.replace(/\n{3,}/g, "\n\n");
  html = html.replace(/[ \t]{2,}/g, " ");
  return html.trim();
}

function fmtDate(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function safePay(job: Job) {
  const p = (job.pay_extracted || "").trim();
  if (!job.has_pay) return null;
  if (!p) return null;
  if (p.length < 3 || p.length > 80) return null;
  return p;
}

function isHtmlish(s: string) {
  const t = (s || "").trim();
  if (!t) return false;
  return /<\/?[a-z][\s\S]*>/i.test(t) || t.includes("&lt;") || t.includes("&gt;");
}

/** Always produce clean readable text, even if description_text contains HTML */
function getNormalizedDescription(job: Job) {
  const raw = (job.description_text || "").trim() || (job.description || "").trim();
  if (!raw) return "";

  // If it looks like HTML, convert it; if it's plain text, still decode entities + cleanup.
  const text = isHtmlish(raw) ? htmlToReadableText(raw) : decodeEntities(raw).trim();

  // final cleanup
  return text.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

// “Don’t get flagged” index guard:
// - Only index active jobs
// - Must have title + company + apply URL
// - Must have enough text to not be “thin content”
function shouldIndex(job: Job) {
  if (!job.is_active) return false;

  const titleOk = (job.title || "").trim().length >= 5;
  const companyOk = (job.company || job.source_company || "").trim().length >= 2;
  const urlOk = !!(job.url && job.url.startsWith("http"));

  const text = getNormalizedDescription(job);
  const descOk = text.length >= 200;

  return titleOk && companyOk && urlOk && descOk;
}

async function getJobBySlug(slug: string): Promise<Job | null> {
  const { data, error } = await supaAdmin()
    .from("jobs")
    .select(
      "slug,source,source_company,source_job_id,title,company,location_city,location_state,location_raw,url,posted_at,last_seen_at,is_active,description,description_text,has_pay,pay_extracted"
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return (data as Job) ?? null;
}

/** Render helper: paragraphs + bullets */
function renderDescriptionBlocks(text: string) {
  const blocks = text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);

  return blocks.map((block, idx) => {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    const bulletLines = lines.filter((l) => l.startsWith("• "));
    const nonBulletLines = lines.filter((l) => !l.startsWith("• "));

    const looksLikeList =
      bulletLines.length >= 2 && bulletLines.length >= Math.max(1, Math.floor(lines.length / 2));

    if (looksLikeList) {
      return (
        <ul key={idx} className="my-4 list-disc space-y-1 pl-6">
          {bulletLines.map((l, i) => (
            <li key={i}>{l.replace(/^•\s*/, "")}</li>
          ))}
        </ul>
      );
    }

    // If it’s a “Heading:” line, make it stand out
    if (lines.length === 1 && lines[0].endsWith(":") && lines[0].length <= 80) {
      return (
        <h3 key={idx} className="mt-6 text-base font-semibold text-gray-900">
          {lines[0].replace(/:$/, "")}
        </h3>
      );
    }

    return (
      <p key={idx} className="my-3 leading-relaxed">
        {nonBulletLines.join(" ")}
      </p>
    );
  });
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job || !job.is_active) {
    return { title: "Job not found | HireCRE", robots: { index: false, follow: false } };
  }

  const company = (job.company || job.source_company || "Company").trim();
  const title = (job.title || "Job").trim();

  const indexable = shouldIndex(job);

  return {
    title: `${title} at ${company} | HireCRE`,
    description: `Apply for ${title} at ${company}. HireCRE aggregates commercial real estate jobs and links to the employer’s official posting.`,
    alternates: { canonical: `${SITE_URL}/jobs/${job.slug}` },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: `${title} at ${company} | HireCRE`,
      description: `Apply for ${title} at ${company}.`,
      url: `${SITE_URL}/jobs/${job.slug}`,
      type: "article",
    },
  };
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job || !job.is_active) return notFound();

  const company = (job.company || job.source_company || "Company").trim();
  const title = (job.title || "Untitled role").trim();

  const posted = fmtDate(job.posted_at);
  const pay = safePay(job);

  const location =
    (job.location_city && job.location_state && `${job.location_city}, ${job.location_state}`) ||
    job.location_raw ||
    "";

  const descText = getNormalizedDescription(job);
  const indexable = shouldIndex(job);

  const jsonLd: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    hiringOrganization: { "@type": "Organization", name: company },
    datePosted: job.posted_at ? new Date(job.posted_at).toISOString() : undefined,
    jobLocation: location
      ? {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: job.location_city || undefined,
            addressRegion: job.location_state || undefined,
          },
        }
      : undefined,
    description: descText ? descText.slice(0, 5000) : undefined,
    url: job.url || undefined,
    directApply: true,
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      {!indexable ? (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          This listing is visible to users, but it’s not eligible for search indexing (missing details or too little description).
        </div>
      ) : null}

      <header className="space-y-2">
        <p className="text-sm text-gray-500">HireCRE Jobs</p>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">{title}</h1>

        <div className="text-lg text-gray-700">
          <span className="font-medium text-gray-900">{company}</span>
          {location ? <span className="text-gray-500"> • {location}</span> : null}
        </div>

        <div className="text-sm text-gray-500">
          {posted ? <>Posted {posted}</> : null}
          {pay ? (
            <>
              {posted ? " • " : null}
              Pay: {pay}
            </>
          ) : null}
        </div>
      </header>

      <div className="mt-6 flex flex-wrap gap-3">
        {job.url ? (
          <a
            href={job.url}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Apply on employer site
          </a>
        ) : null}

        <a
          href="/board"
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
        >
          Back to jobs
        </a>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900">Job description</h2>

        <div className="prose prose-neutral max-w-none">
          {descText ? (
            <div className="mt-3">{renderDescriptionBlocks(descText)}</div>
          ) : (
            <p className="mt-3">
              This job did not include a description. Please check the employer’s posting for full details.
            </p>
          )}
        </div>
      </section>

      <section className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700">
        <h3 className="mb-2 font-semibold text-gray-900">About this listing</h3>
        <p>
          HireCRE is a job aggregator. We display jobs sourced from publicly available employer postings and link you
          to the employer’s official site to apply. We are not affiliated with the employer unless stated.
        </p>
        <p className="mt-2">Always confirm job details on the employer’s site before applying.</p>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
