import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const MAILERLITE_API_TOKEN = process.env.MAILERLITE_API_TOKEN;
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;

const FROM_NAME = process.env.MAILERLITE_FROM_NAME || "HireCRE";
const FROM_EMAIL = process.env.MAILERLITE_FROM_EMAIL || "hirecre@a26cos.com";
const REPLY_TO = process.env.MAILERLITE_REPLY_TO || FROM_EMAIL;

// Preview mode
const PREVIEW = process.env.PREVIEW === "1";
const PREVIEW_EMAIL = (process.env.PREVIEW_EMAIL || "hirecre@a26cos.com").trim().toLowerCase();

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}
if (!MAILERLITE_API_TOKEN) {
  console.error("Missing MAILERLITE_API_TOKEN");
  process.exit(1);
}
if (!MAILERLITE_GROUP_ID) {
  console.error("Missing MAILERLITE_GROUP_ID (create a Group in MailerLite and paste its id here)");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function mlRequest(path, method, body) {
  const res = await fetch(`https://connect.mailerlite.com/api/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${MAILERLITE_API_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    // leave as text
  }

  if (!res.ok) {
    const msg = json?.message || json?.error || text || `HTTP ${res.status}`;
    throw new Error(`MailerLite API error: ${msg}`);
  }

  return json;
}

async function mlPost(path, body) {
  return mlRequest(path, "POST", body);
}

async function ensureSentAtColumn() {
  const { error } = await supabase.from("newsletter_issues").select("sent_at").limit(1);
  if (error) {
    throw new Error(
      "newsletter_issues.sent_at column is missing. Add it in Supabase SQL Editor:\n\n" +
        "alter table public.newsletter_issues add column if not exists sent_at timestamptz;"
    );
  }
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

// Preview mode should NOT mark sent
async function markSent(id) {
  if (PREVIEW) {
    console.log("🧪 PREVIEW MODE — not marking issue as sent");
    return;
  }

  const { error } = await supabase
    .from("newsletter_issues")
    .update({ sent_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw error;
}

async function sendPreviewEmail({ subject, html }) {
  if (!PREVIEW_EMAIL) throw new Error("PREVIEW_EMAIL is missing/blank.");

  // Uses MailerLite "emails" endpoint (transactional-ish) to send a single test email.
  // This avoids touching groups/subscribers and is safest for previews.
  await mlPost("emails", {
    subject,
    from: FROM_EMAIL,
    from_name: FROM_NAME,
    reply_to: REPLY_TO,
    to: [{ email: PREVIEW_EMAIL }],
    html,
  });

  console.log(`🧪 PREVIEW MODE — sent preview to ${PREVIEW_EMAIL}`);
}

async function createAndSendCampaign({ name, subject, html }) {
  // Create campaign (regular)
  const campaign = await mlPost("campaigns", {
    name,
    type: "regular",
    groups: [String(MAILERLITE_GROUP_ID)],
    emails: [
      {
        subject,
        from_name: FROM_NAME,
        from: FROM_EMAIL,
        reply_to: REPLY_TO,
        content: html,
      },
    ],
  });

  const campaignId = campaign?.data?.id;
  if (!campaignId) throw new Error("MailerLite did not return a campaign id.");

  // Send now
  await mlPost(`campaigns/${campaignId}/schedule`, { delivery: "instant" });

  return campaignId;
}

async function main() {
  await ensureSentAtColumn();

  const issue = await getLatestUnsentIssue();
  if (!issue) {
    console.log("✅ No unsent newsletter issues found. Nothing to send.");
    return;
  }
  if (!issue.subject || !issue.html) {
    throw new Error("Issue is missing subject or html in Supabase.");
  }

  const name = `HireCRE Newsletter ${issue.send_date}`;

  if (PREVIEW) {
    await sendPreviewEmail({ subject: issue.subject, html: issue.html });
    // Do NOT schedule campaign, do NOT mark sent
    console.log(`✅ Preview complete for send_date: ${issue.send_date}`);
    return;
  }

  const campaignId = await createAndSendCampaign({
    name,
    subject: issue.subject,
    html: issue.html,
  });

  await markSent(issue.id);

  console.log("✅ Sent newsletter via MailerLite.");
  console.log(`✅ send_date: ${issue.send_date}`);
  console.log(`✅ campaign_id: ${campaignId}`);
}

main().catch((e) => {
  console.error("❌ send-newsletter failed:", e?.message ?? e);
  process.exit(1);
});
