// scripts/send-newsletter.mjs
//
// Sends the latest unsent newsletter_issues row to every active
// subscriber in newsletter_subscribers, using MailerSend's API.
//
// Why MailerSend and not MailerLite: MailerLite's free/starter tier
// returns "Content submission is only available on advanced plan" when
// you try to create a campaign via API. MailerSend (same parent company,
// different product — transactional email) allows API sends on the free
// tier. Since MAILERSEND_API_KEY is already set in this project's env,
// we use it.
//
// Runs in the Coolify scheduled task:
//   node scripts/build-newsletter.mjs && node scripts/send-newsletter.mjs
//
// Env vars:
//   SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY   (required)
//   MAILERSEND_API_KEY                          (required for real sends)
//   MAIL_FROM_NAME   (optional, default "HireCRE")
//   MAIL_FROM_EMAIL  (optional, default "hirecre@a26cos.com")
//   MAIL_REPLY_TO    (optional, defaults to MAIL_FROM_EMAIL)
//   PREVIEW=1        -> only sends to PREVIEW_EMAIL, does not mark the
//                       newsletter_issues row as sent.
//   PREVIEW_EMAIL    -> the preview recipient (default hirecre@a26cos.com)

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const MAILERSEND_API_KEY = process.env.MAILERSEND_API_KEY || "";

const FROM_NAME = process.env.MAIL_FROM_NAME || "HireCRE";
const FROM_EMAIL = process.env.MAIL_FROM_EMAIL || "hirecre@a26cos.com";
const REPLY_TO = process.env.MAIL_REPLY_TO || FROM_EMAIL;

const PREVIEW = String(process.env.PREVIEW || "0") === "1";
const PREVIEW_EMAIL = (process.env.PREVIEW_EMAIL || "hirecre@a26cos.com")
  .trim()
  .toLowerCase();

if (!SUPABASE_URL) {
  console.error("Missing SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL)");
  process.exit(1);
}
if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}
if (!MAILERSEND_API_KEY) {
  console.error("Missing MAILERSEND_API_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

async function mailerSend({ to, subject, html }) {
  const res = await fetch("https://api.mailersend.com/v1/email", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MAILERSEND_API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify({
      from: { email: FROM_EMAIL, name: FROM_NAME },
      to: [{ email: to }],
      reply_to: { email: REPLY_TO, name: FROM_NAME },
      subject,
      html,
    }),
  });

  // MailerSend returns 202 with no body on success.
  if (res.status === 202) return { ok: true };

  const text = await res.text().catch(() => "");
  let json = null;
  try { json = JSON.parse(text); } catch {}
  const msg = json?.message || json?.errors || text || `HTTP ${res.status}`;
  throw new Error(
    `MailerSend error (${res.status}): ${typeof msg === "string" ? msg : JSON.stringify(msg)}`
  );
}

async function getLatestUnsentIssue() {
  const { data, error } = await supabase
    .from("newsletter_issues")
    .select("id, send_date, subject, html, sent_at")
    .is("sent_at", null)
    .order("send_date", { ascending: false })
    .limit(1);

  if (error) throw error;
  return data?.[0] ?? null;
}

async function getActiveSubscribers() {
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("email, is_active")
    .or("is_active.is.null,is_active.eq.true");

  if (error) throw error;
  // De-dupe and normalize
  const set = new Set();
  for (const row of data || []) {
    const e = (row.email || "").trim().toLowerCase();
    if (e && /^\S+@\S+\.\S+$/.test(e)) set.add(e);
  }
  return Array.from(set);
}

async function markSent(id) {
  const { error } = await supabase
    .from("newsletter_issues")
    .update({ sent_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

async function main() {
  const issue = await getLatestUnsentIssue();
  if (!issue) {
    console.log("✅ No unsent newsletter issues. Nothing to send.");
    return;
  }
  if (!issue.subject || !issue.html) {
    throw new Error("Latest issue is missing subject or html.");
  }

  let recipients;
  if (PREVIEW) {
    recipients = [PREVIEW_EMAIL];
    console.log(`🧪 PREVIEW MODE — sending only to: ${PREVIEW_EMAIL}`);
  } else {
    recipients = await getActiveSubscribers();
    if (recipients.length === 0) {
      console.log("✅ No active subscribers. Marking issue sent and exiting.");
      await markSent(issue.id);
      return;
    }
  }

  console.log(
    `Sending newsletter "${issue.subject}" (send_date=${issue.send_date}) to ${recipients.length} recipient${recipients.length === 1 ? "" : "s"} via MailerSend`
  );

  let sent = 0;
  let failed = 0;
  const errors = [];

  for (const email of recipients) {
    try {
      await mailerSend({
        to: email,
        subject: issue.subject,
        html: issue.html,
      });
      sent++;
      console.log(`  ✓ ${email}`);
      // Be gentle — MailerSend free tier has a rate limit.
      await new Promise((r) => setTimeout(r, 200));
    } catch (e) {
      failed++;
      const msg = e?.message ?? String(e);
      errors.push({ email, msg });
      console.log(`  ✗ ${email} — ${msg}`);
    }
  }

  console.log(
    `Done. sent=${sent} failed=${failed}${PREVIEW ? " (PREVIEW)" : ""}`
  );

  if (!PREVIEW && sent > 0 && failed === 0) {
    await markSent(issue.id);
    console.log(`✅ Marked issue ${issue.id} sent.`);
  } else if (!PREVIEW && sent > 0 && failed > 0) {
    // Partial success — still mark sent so we don't re-send to people
    // who already received it, but log failures loudly for follow-up.
    await markSent(issue.id);
    console.log(
      `⚠ Partial send: ${failed} recipient(s) failed. Issue marked sent anyway to prevent duplicates. Failures:`
    );
    for (const { email, msg } of errors) console.log(`   - ${email}: ${msg}`);
  } else if (!PREVIEW && sent === 0) {
    throw new Error("All sends failed — not marking issue sent.");
  }
}

main().catch((e) => {
  console.error("❌ send-newsletter failed:", e?.message ?? e);
  process.exit(1);
});
