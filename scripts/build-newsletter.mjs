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
      `Template is missing placeholder ${placeholder}. Add it to templates/newsletter.html exactly.`
    );
  }
}

// Use UTC date to avoid timezone weirdness on servers
function isoDateUTC(d = new Date()) {
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

async function main() {
  // ---------- Pull data ----------
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const { data: topJobs, error: topErr } = await supabase
    .from("jobs")
    .select("id,title,company,location_city,location_state,location_raw,url,posted_at")
    .eq("is_active", true)
    .gte("posted_at", since)
    .order("posted_at", { ascending: false })
    .limit(8);

  if (topErr) throw topErr;

  const { data: mostClicked, error: popErr } = await supabase
    .from("most_clicked_jobs_7d_details")
    .select("id,title,company,location_city,location_state,location_raw,url,posted_at,clicks")
    .limit(10);

  if (popErr) {
    throw new Error(
      `Could not read most_clicked_jobs_7d_details view. Create it in Supabase SQL Editor. Original error: ${popErr.message}`
    );
  }

  // ---------- Build content ----------
  const sendDate = isoDateUTC(new Date());
  const subject = `HireCRE Newsletter — ${sendDate}`;

  const content = {
    generated_at: new Date().toISOString(),
    send_date: sendDate,
    subject,
    note:
      "Quick pulse check: the best roles are still moving fast. If you see something you like, don’t overthink it — apply, then tighten the story after.",
    top_jobs: topJobs ?? [],
    most_clicked_jobs: mostClicked ?? [],
  };

  // ---------- Load template ----------
  const templatePath = path.join(process.cwd(), "templates", "newsletter.html");
  const html = fs.readFileSync(templatePath, "utf8");

  requirePlaceholder(html, "{{THIS_WEEKS_NOTE}}");
  requirePlaceholder(html, "{{TOP_JOBS_CARDS}}");
  requirePlaceholder(html, "{{MOST_CLICKED_LIST}}");

  const topCards = (content.top_jobs ?? []).slice(0, 3).map(roleCard).join("\n\n");
  const topCardsFinal =
    topCards ||
    `<div style="color:#475569; font-size:13px; line-height:1.55; margin:0 0 12px;">
      No brand-new postings hit the feed in the last 7 days — browse the latest roles on the board.
    </div>`;

  const popularLinks = (content.most_clicked_jobs ?? [])
    .slice(0, 10)
    .map(quickLink)
    .join("\n\n");
  const popularLinksFinal =
    popularLinks ||
    `<div style="color:#475569; font-size:13px; line-height:1.55; margin:0;">
      Not enough click data yet — check back next week once more people have been browsing.
    </div>`;

  let outHtml = html;
  outHtml = outHtml.replace("{{THIS_WEEKS_NOTE}}", safe(content.note));
  outHtml = outHtml.replace("{{TOP_JOBS_CARDS}}", topCardsFinal);
  outHtml = outHtml.replace("{{MOST_CLICKED_LIST}}", popularLinksFinal);

  // ---------- Write local artifacts (handy for debugging) ----------
  fs.mkdirSync(path.join(process.cwd(), "out"), { recursive: true });
  fs.writeFileSync(
    path.join(process.cwd(), "out", "newsletter-content.json"),
    JSON.stringify(content, null, 2)
  );
  fs.writeFileSync(path.join(process.cwd(), "out", "newsletter.html"), outHtml);

  // ---------- Save to Supabase (durable storage) ----------
  const { error: upsertErr } = await supabase
    .from("newsletter_issues")
    .upsert(
      {
        send_date: sendDate,
        subject,
        html: outHtml,
        content,
      },
      { onConflict: "send_date" }
    );

  if (upsertErr) throw upsertErr;

  console.log("✅ Wrote:");
  console.log(" - out/newsletter.html");
  console.log(" - out/newsletter-content.json");
  console.log("✅ Saved newsletter to Supabase table: newsletter_issues");
  console.log(`✅ send_date: ${sendDate}`);
}

main().catch((e) => {
  console.error("❌ build-newsletter failed:", e?.message ?? e);
  process.exit(1);
});
