// app/jobs/[slug]/page.tsx
import { supabaseAdmin } from "@/lib/supabaseAdmin";
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

  description: string | null;
  description_text: string | null;

  has_pay: boolean | null;
  pay_extracted: string | null;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hirecre.com";

// Back-compat alias: the existing code uses supaAdmin() as a factory;
// keep it callable but route through the shared singleton.
const supaAdmin = supabaseAdmin;

function decodeEntities(s: string) {
  return String(s || "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\u00a0/g, " ");
}

function stripHtml(input: string) {
  const html = String(input || "");
  return decodeEntities(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<\/(p|div|br|li|h1|h2|h3|h4)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<li[^>]*>/gi, "• ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function looksLikeHtml(s: string) {
  return /<\s*[a-z][\s\S]*>/i.test(s);
}

function cleanDescription(job: Job) {
  const raw = (job.description_text || job.description || "").toString();
  if (!raw.trim()) return "";

  const normalized = looksLikeHtml(raw) ? stripHtml(raw) : decodeEntities(raw);
  const finalText = looksLikeHtml(normalized) ? stripHtml(normalized) : normalized;

  return finalText
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
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

// Detect whether a role is remote based on the location fields.
function detectRemote(job: Job): boolean {
  const hay = `${job.location_raw ?? ""} ${job.location_city ?? ""} ${job.location_state ?? ""}`.toLowerCase();
  return /\bremote\b|\bwork from home\b|\bwfh\b|\btelecommut/.test(hay);
}

// Guess an employment type from the job title. Defaults to FULL_TIME.
// Returns the Schema.org-valid enum value.
function guessEmploymentType(title: string): string {
  const t = title.toLowerCase();
  if (/\bintern(ship)?\b/.test(t)) return "INTERN";
  if (/\bpart[-\s]?time\b/.test(t)) return "PART_TIME";
  if (/\btemporary\b|\btemp\b/.test(t)) return "TEMPORARY";
  if (/\bcontract(or|ing)?\b|\bcontract to hire\b|\bfreelanc/.test(t)) return "CONTRACTOR";
  if (/\bvolunteer\b/.test(t)) return "VOLUNTEER";
  return "FULL_TIME";
}

// Parse a free-text pay string into a Schema.org baseSalary object.
// Handles common patterns like:
//   "$100,000 - $120,000 / year"
//   "$100k-$120k"
//   "$80,000 per year"
//   "$50/hour"
function parseBaseSalary(pay: string):
  | {
      "@type": "MonetaryAmount";
      currency: string;
      value: {
        "@type": "QuantitativeValue";
        unitText: "HOUR" | "YEAR";
        minValue?: number;
        maxValue?: number;
        value?: number;
      };
    }
  | null {
  if (!pay) return null;
  const s = String(pay).replace(/\s+/g, " ").trim();

  // Expand "k" shorthand (e.g. "$120k" -> "$120000").
  const expanded = s.replace(
    /\$\s*([\d,.]+)\s*k\b/gi,
    (_m, num: string) => `$${Math.round(parseFloat(num.replace(/,/g, "")) * 1000)}`
  );

  const rangeMatch = expanded.match(
    /\$\s*([\d,]+(?:\.\d+)?)\s*(?:-|–|to)\s*\$?\s*([\d,]+(?:\.\d+)?)/
  );
  const singleMatch = expanded.match(/\$\s*([\d,]+(?:\.\d+)?)/);

  let minValue: number | undefined;
  let maxValue: number | undefined;
  let value: number | undefined;

  if (rangeMatch) {
    minValue = Number(rangeMatch[1].replace(/,/g, ""));
    maxValue = Number(rangeMatch[2].replace(/,/g, ""));
    if (!Number.isFinite(minValue) || !Number.isFinite(maxValue)) return null;
  } else if (singleMatch) {
    value = Number(singleMatch[1].replace(/,/g, ""));
    if (!Number.isFinite(value)) return null;
  } else {
    return null;
  }

  const unitText: "HOUR" | "YEAR" =
    /\/\s*h(?:r|our)|\bper\s+hour\b|\bhr\b/i.test(expanded) ? "HOUR" : "YEAR";

  // Sanity check: reject absurd values that might be parsing artifacts.
  const candidate = value ?? maxValue ?? minValue ?? 0;
  if (unitText === "HOUR" && (candidate < 5 || candidate > 1000)) return null;
  if (unitText === "YEAR" && (candidate < 10_000 || candidate > 10_000_000)) return null;

  return {
    "@type": "MonetaryAmount",
    currency: "USD",
    value: {
      "@type": "QuantitativeValue",
      unitText,
      ...(minValue !== undefined ? { minValue } : {}),
      ...(maxValue !== undefined ? { maxValue } : {}),
      ...(value !== undefined ? { value } : {}),
    },
  };
}

// Pick a reasonable expiration date for the JobPosting JSON-LD. We keep
// active listings fresh for 30 days past the most recent sighting.
function computeValidThrough(job: Job): string {
  const base = job.last_seen_at || job.posted_at;
  const anchor = base ? new Date(base) : new Date();
  const expires = new Date(anchor.getTime() + 30 * 24 * 60 * 60 * 1000);
  return expires.toISOString();
}

// Only index active jobs with enough substance
function shouldIndex(job: Job, descText: string) {
  if (!job.is_active) return false;

  const titleOk = (job.title || "").trim().length >= 5;
  const companyOk = (job.company || job.source_company || "").trim().length >= 2;
  const urlOk = !!(job.url && job.url.startsWith("http"));

  const descOk = descText.trim().length >= 200;
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

/**
 * ========== Snapshot helpers (deterministic, scale-safe) ==========
 */

function normalizeLines(text: string) {
  return String(text || "")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function isBulletLine(line: string) {
  return /^([•\-*]|(\d+\.))\s+/.test(line);
}

function stripBulletPrefix(line: string) {
  return line.replace(/^([•\-*]|(\d+\.))\s+/, "").trim();
}

function looksLikeHeading(line: string) {
  // Keep this conservative: if it's short and not a sentence, treat it as a section header
  const s = line.trim();
  if (s.length < 3 || s.length > 80) return false;
  if (/[.!?]$/.test(s)) return false;
  const words = s.split(/\s+/).filter(Boolean);
  return words.length <= 10;
}

function matchHeading(line: string, patterns: RegExp[]) {
  const s = line.trim().toLowerCase();
  return patterns.some((re) => re.test(s));
}

function extractBulletsUnderHeadings(descText: string, headingPatterns: RegExp[], max = 10) {
  const lines = normalizeLines(descText);
  const out: string[] = [];

  let active = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Turn on capture when we hit a matching heading line
    if (matchHeading(line, headingPatterns) && looksLikeHeading(line)) {
      active = true;
      continue;
    }

    // Stop capture when we hit a new heading (that isn't a bullet)
    if (active && looksLikeHeading(line) && !isBulletLine(line)) {
      break;
    }

    if (!active) continue;

    // Capture bullet lines; also capture "•" lines we created in stripHtml
    if (isBulletLine(line)) {
      const cleaned = stripBulletPrefix(line);
      if (cleaned && cleaned.length <= 240) out.push(cleaned);
      if (out.length >= max) break;
    }
  }

  // If we found nothing under headings, try a fallback: first bullets anywhere after a matching heading appeared
  return dedupe(out);
}

function dedupe(items: string[]) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const it of items) {
    const key = it.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(it);
  }
  return out;
}

function buildTldr(descText: string) {
  // Take first meaningful paragraph (split by blank line)
  const text = String(descText || "").trim();
  if (!text) return null;

  const blocks = text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  if (!blocks.length) return null;

  // Prefer a non-bullet paragraph
  const firstNonBullet = blocks.find((b) => !isBulletLine(b.split("\n")[0]?.trim() || ""));
  const chosen = firstNonBullet || blocks[0];

  // Make it concise: first 1–2 sentences, max ~280 chars
  const oneLine = chosen.replace(/\s+/g, " ").trim();
  if (oneLine.length <= 280) return oneLine;

  // Try sentence cut
  const sentenceCut = oneLine.split(/(?<=[.!?])\s+/).slice(0, 2).join(" ").trim();
  if (sentenceCut && sentenceCut.length <= 320) return sentenceCut;

  return oneLine.slice(0, 280).trim() + "…";
}

function buildSnapshot(descText: string) {
  const tldr = buildTldr(descText);

  const requirements = extractBulletsUnderHeadings(
    descText,
    [
      /^(qualifications|requirements|what you (bring|need)|what we (re|a) looking for|skills|experience|you have)\b/,
      /^required\b/,
      /^minimum\b/,
      /^who you are\b/,
    ],
    10
  );

  const responsibilities = extractBulletsUnderHeadings(
    descText,
    [
      /^(responsibilities|what you('|’)ll do|what you will do|duties|the role|key responsibilities|day to day)\b/,
      /^in this role\b/,
    ],
    10
  );

  return { tldr, requirements, responsibilities };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    return { title: "Job not found | HireCRE", robots: { index: false, follow: false } };
  }

  const company = (job.company || job.source_company || "Company").trim();
  const title = (job.title || "Job").trim();

  // Expired jobs keep their URL alive (with noindex) so any existing
  // inbound links still land on a useful page with related roles
  // instead of a 404. This preserves crawl budget and user experience.
  if (!job.is_active) {
    return {
      title: `${title} at ${company} (role closed) | HireCRE`,
      description: `This ${title} role at ${company} is no longer accepting applications. Browse similar commercial real estate jobs on HireCRE.`,
      alternates: { canonical: `${SITE_URL}/jobs/${job.slug}` },
      robots: { index: false, follow: true },
    };
  }

  const descText = cleanDescription(job);
  const indexable = shouldIndex(job, descText);

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

type RelatedJob = {
  id: string;
  slug: string | null;
  title: string | null;
  company: string | null;
  location_city: string | null;
  location_state: string | null;
  location_raw: string | null;
  posted_at: string | null;
  has_pay: boolean | null;
  pay_extracted: string | null;
};

// Fetch up to `limit` active jobs to show as "related" on an expired
// listing. Prefer same company, fall back to same state, final
// fallback to most-recent.
async function getRelatedJobs(job: Job, limit = 6): Promise<RelatedJob[]> {
  const admin = supabaseAdmin();
  const seen = new Set<string>([job.slug ?? ""]);
  const results: RelatedJob[] = [];
  const select =
    "id,slug,title,company,location_city,location_state,location_raw,posted_at,has_pay,pay_extracted";

  const push = (rows: RelatedJob[]) => {
    for (const row of rows) {
      if (!row.slug || seen.has(row.slug)) continue;
      seen.add(row.slug);
      results.push(row);
      if (results.length >= limit) break;
    }
  };

  if (job.company) {
    const { data } = await admin
      .from("jobs")
      .select(select)
      .eq("is_active", true)
      .not("slug", "is", null)
      .eq("company", job.company)
      .order("posted_at", { ascending: false })
      .limit(limit * 2);
    push((data ?? []) as RelatedJob[]);
  }

  if (results.length < limit && job.location_state) {
    const { data } = await admin
      .from("jobs")
      .select(select)
      .eq("is_active", true)
      .not("slug", "is", null)
      .eq("location_state", job.location_state)
      .order("posted_at", { ascending: false })
      .limit(limit * 2);
    push((data ?? []) as RelatedJob[]);
  }

  if (results.length < limit) {
    const { data } = await admin
      .from("jobs")
      .select(select)
      .eq("is_active", true)
      .not("slug", "is", null)
      .order("posted_at", { ascending: false })
      .limit(limit * 2);
    push((data ?? []) as RelatedJob[]);
  }

  return results.slice(0, limit);
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  // Truly unknown slug → 404. Inactive/expired jobs render a soft
  // "role closed" view below so Google can deindex without losing
  // internal link juice to the board + similar roles.
  if (!job) return notFound();

  const company = (job.company || job.source_company || "Company").trim();
  const title = (job.title || "Untitled role").trim();

  if (!job.is_active) {
    const related = await getRelatedJobs(job);
    return <ExpiredJobPage job={job} title={title} company={company} related={related} />;
  }

  const posted = fmtDate(job.posted_at);
  const pay = safePay(job);

  const location =
    (job.location_city && job.location_state && `${job.location_city}, ${job.location_state}`) ||
    job.location_raw ||
    "";

  const descText = cleanDescription(job);
  const indexable = shouldIndex(job, descText);

  const paragraphs = descText
    ? descText
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

  const snapshot = buildSnapshot(descText);

  const isRemote = detectRemote(job);
  const employmentType = guessEmploymentType(title);
  const validThrough = computeValidThrough(job);
  const baseSalary = pay ? parseBaseSalary(pay) : null;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description: descText.slice(0, 5000),
    datePosted: job.posted_at ? new Date(job.posted_at).toISOString() : undefined,
    validThrough,
    employmentType,
    hiringOrganization: { "@type": "Organization", name: company },
    identifier: {
      "@type": "PropertyValue",
      name: "HireCRE",
      value: job.slug,
    },
    // HireCRE links out to the employer's ATS; set false per Google spec.
    directApply: false,
    url: `${SITE_URL}/jobs/${job.slug}`,
  };

  if (isRemote) {
    // Schema.org: for remote-only postings use jobLocationType +
    // applicantLocationRequirements (Google's requirement).
    jsonLd.jobLocationType = "TELECOMMUTE";
    jsonLd.applicantLocationRequirements = {
      "@type": "Country",
      name: "US",
    };
  }

  // Always include a jobLocation when we have any physical location info,
  // even for remote-plus-office hybrids.
  if (job.location_city || job.location_state || job.location_raw) {
    jsonLd.jobLocation = {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        ...(job.location_city ? { addressLocality: job.location_city } : {}),
        ...(job.location_state ? { addressRegion: job.location_state } : {}),
        addressCountry: "US",
      },
    };
  } else if (!isRemote) {
    // No physical info AND not remote: Google treats this as invalid.
    // Fall back to a country-level location so at least the required
    // field is present and the posting is eligible for indexing.
    jsonLd.jobLocation = {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressCountry: "US" },
    };
  }

  if (baseSalary) {
    jsonLd.baseSalary = baseSalary;
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      {!indexable ? (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          This listing is visible to users, but it’s not eligible for search indexing (missing details or too little
          description).
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
          {posted ? " • " : null}
          {pay ? <>Pay: {pay}</> : <>Pay: Not listed</>}
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

      {/* Opportunity Snapshot (standardized across all jobs) */}
      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Opportunity snapshot</h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {job.source ? (
              <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-1 text-gray-700">
                Source: {job.source}
              </span>
            ) : null}
            {job.is_active ? (
              <span className="rounded-full border border-green-200 bg-green-50 px-2 py-1 text-green-800">
                Active
              </span>
            ) : null}
          </div>
        </div>

        {snapshot.tldr ? (
          <p className="mt-3 text-sm leading-relaxed text-gray-700">{snapshot.tldr}</p>
        ) : (
          <p className="mt-3 text-sm text-gray-600">
            Summary not available — see the full listing below for details.
          </p>
        )}

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <h3 className="text-sm font-semibold text-gray-900">Key requirements</h3>
            {snapshot.requirements.length ? (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                {snapshot.requirements.slice(0, 8).map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-gray-600">
                Not clearly listed — check the full description below.
              </p>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <h3 className="text-sm font-semibold text-gray-900">Key responsibilities</h3>
            {snapshot.responsibilities.length ? (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                {snapshot.responsibilities.slice(0, 8).map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-gray-600">
                Not clearly listed — check the full description below.
              </p>
            )}
          </div>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          Note: Snapshot is auto-generated from the employer’s posting and may omit details. Always confirm on the
          employer site.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold text-gray-900">Job description</h2>

        <div className="prose prose-neutral max-w-none">
          {paragraphs.length ? (
            paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
          ) : (
            <p>This job did not include a description. Please check the employer’s posting for full details.</p>
          )}
        </div>
      </section>

      {/* Cross-links + About */}
      <section className="mt-10 space-y-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900">Keep going</h3>
          <p className="mt-1 text-sm text-gray-700">
            Want help landing the role? Use our tools and prep hub.
          </p>

          <div className="mt-3 flex flex-wrap gap-3">
            <a
              href="/resources"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              Resources
            </a>
            <a
              href="/interview-prep"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              CRE Interview Prep Hub
            </a>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700">
          <h3 className="mb-2 font-semibold text-gray-900">About this listing</h3>
          <p>
            HireCRE is a job aggregator. We display jobs sourced from publicly available employer postings and link you
            to the employer’s official site to apply. We are not affiliated with the employer unless stated.
          </p>
          <p className="mt-2">Always confirm job details on the employer’s site before applying.</p>
          <p className="mt-2">
            If you’re the employer and would like this job removed (or you’d like your company’s jobs removed), please
            contact{" "}
            <a className="font-semibold underline" href="mailto:hirecre@a26cos.com">
              hirecre@a26cos.com
            </a>
            .
          </p>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}

function ExpiredJobPage({
  job,
  title,
  company,
  related,
}: {
  job: Job;
  title: string;
  company: string;
  related: RelatedJob[];
}) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-900">
          Role closed
        </div>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          {title} at {company}
        </h1>
        <p className="mt-3 text-base text-gray-600">
          This role is no longer accepting applications. It may have been
          filled, withdrawn, or removed from the employer&apos;s career site.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="/board"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Browse all active jobs
          </a>
          <a
            href="/alerts"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            Get job alerts
          </a>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Similar active CRE roles
          </h2>
          <ul className="mt-4 grid gap-4">
            {related.map((r) => (
              <li
                key={r.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="text-base font-semibold text-gray-900">
                      {r.slug ? (
                        <a href={`/jobs/${r.slug}`} className="hover:underline">
                          {r.title ?? "Untitled role"}
                        </a>
                      ) : (
                        r.title ?? "Untitled role"
                      )}
                    </div>
                    <div className="mt-1 text-sm text-gray-700">
                      <span className="font-medium">{r.company ?? "—"}</span>
                      {(r.location_city || r.location_state) ? (
                        <>
                          <span className="mx-1 text-gray-400">•</span>
                          <span>
                            {[r.location_city, r.location_state]
                              .filter(Boolean)
                              .join(", ")}
                          </span>
                        </>
                      ) : null}
                    </div>
                  </div>
                  {r.slug ? (
                    <a
                      href={`/jobs/${r.slug}`}
                      className="mt-3 inline-flex shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 sm:mt-0"
                    >
                      View job
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
