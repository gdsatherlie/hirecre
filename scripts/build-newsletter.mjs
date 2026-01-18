import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function safe(s) {
  return String(s ?? "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function fmtLocation(job) {
  const city = (job.location_city ?? "").trim();
  const st = (job.location_state ?? "").trim();
  const raw = (job.location_raw ?? "").trim();
  if (city && st) return `${city}, ${st}`;
  if (city) return city;
  if (st) return st;
  if (raw) return raw;
  return "—";
}

function roleCard(job) {
  const title = safe(job.title || "Untitled role");
  const company = safe(job.company || "—");
  const location = safe(fmtLocation(job));
  const url = job.url || "https://hirecre.com/board";

  return `
  <div style="border:1px solid #E2E8F0; border-radius:14px; padding:14px; margin:0 0 12px; background:#FFFFFF;">
    <div style="font-size:15px; font-weight:900; margin:0 0 4px;">
      <a href="${url}" style="color:#0F172A; text-decoration:none;">${title}</a>
    </div>
    <div style="font-size:13px; color:#475569; margin:0 0 10px;">${company} • ${location}</div>
    <a href="${url}" style="display:inline-block; font-size:13px; font-weight:900; color:#2563EB; text-decoration:none;">View role →</a>
  </div>
  `.trim();
}

function quickLink(job) {
  const title = safe(job.title || "Role");
  const company = safe(job.company || "—");
  const location = safe(fmtLocation(job));
  const url = job.url || "https://hirecre.com/board";

  return `
  <div style="padding:10px 0; border-top:1px solid #E2E8F0;">
    <div style="font-size:14px; font-weight:900; margin:0 0 3px;">
      <a href="${url}" style="color:#0F172A;">${title}</a>
    </div>
    <div style="font-size:13px; color:#475569; margin:0;">${company} • ${location}</div>
  </div>
  `.trim();
}

function requirePlaceholder(html, placeholder) {
  if (!html.includes(placeholder)) {
    throw new Error(
      `Template is missing placeholder ${placeholder}. Make sure templates/newsletter.html includes it exactly.`
    );
  }
}

async function main() {
  // --- Pull data from Supabase ---

  // 1) Top jobs this week (fresh)
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const { data: topJobs, error: topErr } = await supabase
    .from("jobs")
    .select("id,title,company,location_city,location_state,location_raw,url,posted_at")
    .eq("is_active", true)
    .gte("posted_at", since)
    .order("posted_at", { ascending: false })
    .limit(8);

  if (topErr) throw topErr;

  // 2) Most clicked jobs (board only, last 7 days)
  // This assumes you created the view "most_clicked_jobs_7d_details".
  const { data: mostClicked, error: popErr } = await supabase
    .from("most_clicked_jobs_7d_details")
    .select("id,title,company,location_city,location_state,location_raw,url,posted_at,clicks")
    .limit(10);

  if (popErr) {
    throw new Error(
      `Could not read most_clicked_jobs_7d_details view. Create it in Supabase SQL Editor. Original error: ${popErr.message}`
    );
  }

  // --- Build content blocks ---
  const content = {
    generated_at: new Date().toISOString(),
    note:
      "Quick pulse check: hiring is still active across debt + acquisitions, but the best roles are moving fast. If you see something you like, don’t overthink it — apply, then tighten the story after.",
    top_jobs: topJobs ?? [],
    most_clicked_jobs: mostClicked ?? [],
  };

  // --- Ensure output folder exists at the ROOT ---
  // This creates: <project-root>/out
  fs.mkdirSync(path.join(process.cwd(), "out"), { recursive: true });

  // Save JSON for your own review
  fs.writeFileSync(
    path.join(process.cwd(), "out", "newsletter-content.json"),
    JSON.stringify(content, null, 2)
  );

  // --- Load template from ROOT/templates/newsletter.html ---
  const templatePath = path.join(process.cwd(), "templates", "newsletter.html");
  const html = fs.readFileSync(templatePath, "utf8");

  // Verify placeholders exist (prevents silent failures)
  requirePlaceholder(html, "{{THIS_WEEKS_NOTE}}");
  requirePlaceholder(html, "{{TOP_JOBS_CARDS}}");
  requirePlaceholder(html, "{{MOST_CLICKED_LIST}}");

  // Create blocks
  const topCards = (content.top_jobs ?? []).slice(0, 3).map(roleCard).join("\n\n");

  // If no top jobs this week, show a friendly fallback
  const topCardsFinal =
    topCards ||
    `<div style="color:#475569; font-size:13px; line-height:1.55; margin:0 0 12px;">
      No brand-new postings hit the feed in the last 7 days — but the board is still moving. Browse the latest roles.
    </div>`;

  const popularLinks = (content.most_clicked_jobs ?? []).slice(0, 10).map(quickLink).join("\n\n");

  // If no clicks yet, show fallback
  const popularLinksFinal =
    popularLinks ||
    `<div style="color:#475569; font-size:13px; line-height:1.55; margin:0;">
      Not enough click data yet — check back next week once a few people have been browsing.
    </div>`;

  // Fill template using placeholders
  let outHtml = html;
  outHtml = outHtml.replace("{{THIS_WEEKS_NOTE}}", safe(content.note));
  outHtml = outHtml.replace("{{TOP_JOBS_CARDS}}", topCardsFinal);
  outHtml = outHtml.replace("{{MOST_CLICKED_LIST}}", popularLinksFinal);

  // Write final HTML
  fs.writeFileSync(path.join(process.cwd(), "out", "newsletter.html"), outHtml);

  console.log("✅ Wrote:");
  console.log(" - out/newsletter.html");
  console.log(" - out/newsletter-content.json");
}

main().catch((e) => {
  console.error("❌ build-newsletter failed:", e?.message ?? e);
  process.exit(1);
});
