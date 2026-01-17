import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const MAILERSEND_API_KEY = process.env.MAILERSEND_API_KEY;
const ALERT_FROM_EMAIL = process.env.ALERT_FROM_EMAIL || "hirecre@a26cos.com";
const ALERT_FROM_NAME = process.env.ALERT_FROM_NAME || "HireCRE Alerts";

if (!SUPABASE_URL) throw new Error("Missing SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL)");
if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
if (!MAILERSEND_API_KEY) throw new Error("Missing MAILERSEND_API_KEY");

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

function escHtml(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml({ title, items, manageUrl, siteUrl }) {
  const rows = items
    .map(
      (j) => `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;">
          <div style="font-size:14px;font-weight:700;color:#0f172a;margin-bottom:4px;">
            <a href="${escHtml(j.url)}" style="color:#0f172a;text-decoration:none;">${escHtml(j.title)}</a>
          </div>
          <div style="font-size:13px;color:#334155;">
            ${escHtml(j.company)} • ${escHtml(j.location)}
          </div>
          <div style="font-size:12px;color:#64748b;margin-top:6px;">
            Source: ${escHtml(j.source)}${j.pay ? " • Pay: " + escHtml(j.pay) : ""}
          </div>
        </td>
      </tr>`
    )
    .join("");

  return `<!doctype html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:28px 16px;">
    <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:20px;">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <a href="${siteUrl}" style="font-size:18px;font-weight:800;letter-spacing:-0.02em;color:#0f172a;text-decoration:none;">
          HireCRE
        </a>
        <a href="${manageUrl}" style="font-size:12px;color:#2563eb;text-decoration:none;">Manage alerts</a>
      </div>

      <h1 style="font-size:18px;margin:18px 0 6px;color:#0f172a;">${escHtml(title)}</h1>
      <p style="margin:0 0 14px;color:#475569;font-size:13px;">New jobs matching your saved search.</p>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        ${rows}
      </table>

      <div style="margin-top:18px;font-size:12px;color:#64748b;">
        Didn’t expect this? You can disable alerts here:
        <a href="${manageUrl}" style="color:#2563eb;text-decoration:none;">${manageUrl}</a>
      </div>
    </div>

    <div style="text-align:center;margin-top:12px;color:#94a3b8;font-size:12px;">
      © ${new Date().getFullYear()} HireCRE
    </div>
  </div>
</body>
</html>`;
}

async function sendEmail({ toEmail, subject, html }) {
  const res = await fetch("https://api.mailersend.com/v1/email", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MAILERSEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: { email: ALERT_FROM_EMAIL, name: ALERT_FROM_NAME },
      to: [{ email: toEmail }],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`MailerSend error ${res.status}: ${txt}`);
  }
}

function matchJobToSearch(job, s) {
  // s has: q, state, company, source, remote_only, pay_only (nullable)
  if (s.state && job.location_state !== s.state) return false;
  if (s.source && String(job.source || "").toLowerCase() !== String(s.source).toLowerCase()) return false;

  if (s.company) {
    const hay = String(job.company || "").toLowerCase();
    if (!hay.includes(String(s.company).toLowerCase())) return false;
  }

  if (s.remote_only) {
    const hay = `${job.location_raw || ""} ${job.location_city || ""} ${job.location_state || ""}`.toLowerCase();
    if (!hay.includes("remote")) return false;
  }

  if (s.pay_only) {
    if (!job.has_pay) return false;
  }

  if (s.q) {
    const hay = `${job.title || ""} ${job.company || ""} ${job.location_raw || ""} ${job.location_city || ""} ${job.location_state || ""}`.toLowerCase();
    if (!hay.includes(String(s.q).toLowerCase())) return false;
  }

  return true;
}

function fmtLocation(job) {
  const city = (job.location_city || "").trim();
  const state = (job.location_state || "").trim();
  const raw = (job.location_raw || "").trim();
  if (city && state) return `${city}, ${state}`;
  if (city) return city;
  if (state) return state;
  return raw || "—";
}

function extractPay(job) {
  return (
    (job.pay_extracted || "").trim() ||
    (job.pay || "").trim() ||
    (job.pay_text || "").trim() ||
    (job.salary || "").trim() ||
    (job.compensation || "").trim() ||
    null
  );
}

async function main() {
  const SITE_URL = process.env.SITE_URL || "https://hirecre.com";
  const MANAGE_ALERTS_URL = process.env.MANAGE_ALERTS_URL || `${SITE_URL}/alerts`;

  // 1) load enabled saved searches
  const { data: searches, error: sErr } = await supabase
    .from("saved_searches")
    .select("id,user_email,q,state,company,source,remote_only,pay_only,is_enabled,last_alerted_at")
    .eq("is_enabled", true)
    .limit(5000);

  if (sErr) throw sErr;
  if (!searches || searches.length === 0) {
    console.log("No enabled saved searches.");
    return;
  }

  // 2) load recent jobs (last 3 days) to match against
  const since = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
  const { data: jobs, error: jErr } = await supabase
    .from("jobs")
    .select("id,title,company,source,location_city,location_state,location_raw,url,posted_at,has_pay,pay_extracted,pay,pay_text,salary,compensation")
    .eq("is_active", true)
    .gte("posted_at", since)
    .order("posted_at", { ascending: false })
    .limit(5000);

  if (jErr) throw jErr;

  for (const s of searches) {
    const email = s.user_email;
    if (!email) continue;

    // 3) match jobs to this search
    const matches = (jobs || []).filter((j) => matchJobToSearch(j, s)).slice(0, 20);
    if (matches.length === 0) continue;

    // 4) remove jobs already sent for this saved_search
    const matchIds = matches.map((m) => m.id);

    const { data: already, error: aErr } = await supabase
      .from("saved_search_alerts")
      .select("job_id")
      .eq("saved_search_id", s.id)
      .in("job_id", matchIds);

    if (aErr) throw aErr;

    const alreadySet = new Set((already || []).map((r) => r.job_id));
    const newOnes = matches.filter((m) => !alreadySet.has(m.id));

    if (newOnes.length === 0) continue;

    const items = newOnes.map((j) => ({
      title: j.title || "Untitled role",
      company: j.company || "—",
      location: fmtLocation(j),
      source: String(j.source || "unknown").toLowerCase(),
      url: j.url || SITE_URL,
      pay: extractPay(j),
    }));

    const subject = `HireCRE Alerts: ${newOnes.length} new job${newOnes.length === 1 ? "" : "s"}`;
    const html = buildEmailHtml({
      title: `${newOnes.length} new job${newOnes.length === 1 ? "" : "s"} for you`,
      items,
      manageUrl: MANAGE_ALERTS_URL,
      siteUrl: SITE_URL,
    });

    // 5) send email
    await sendEmail({ toEmail: email, subject, html });
    console.log(`Sent ${newOnes.length} to ${email}`);

    // 6) record sent rows (dedupe)
    const insertRows = newOnes.map((j) => ({ saved_search_id: s.id, job_id: j.id }));
    const { error: insErr } = await supabase.from("saved_search_alerts").insert(insertRows);
    if (insErr) throw insErr;

    // 7) update last_alerted_at
    await supabase.from("saved_searches").update({ last_alerted_at: new Date().toISOString() }).eq("id", s.id);
  }

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
