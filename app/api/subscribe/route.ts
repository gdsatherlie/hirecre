import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function isValidEmail(email: string) {
  return /^\S+@\S+\.\S+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const emailRaw = String(body?.email ?? "");
    const sourceRaw = String(body?.source ?? "website");

    const email = emailRaw.trim().toLowerCase();
    const source = sourceRaw.trim().slice(0, 100);

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    // ---- 1) Save to Supabase (your current system of record) ----
    const supabaseUrl = process.env.SUPABASE_URL!;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Server misconfigured: missing Supabase env vars." },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // If you have a unique constraint on email, this will upsert cleanly.
    const { error: dbErr } = await supabase
      .from("newsletter_subscribers")
      .upsert(
        { email, source },
        { onConflict: "email", ignoreDuplicates: false }
      );

    if (dbErr) {
      return NextResponse.json(
        { error: `Supabase insert failed: ${dbErr.message}` },
        { status: 500 }
      );
    }

    // ---- 2) Push to MailerLite group ----
    const token = process.env.MAILERLITE_API_TOKEN;
    const groupId = process.env.MAILERLITE_GROUP_ID;

    if (!token || !groupId) {
      // Don’t fail signups if MailerLite isn’t configured yet
      return NextResponse.json({
        ok: true,
        mailerlite: false,
        note: "Saved to Supabase. MailerLite env vars not set.",
      });
    }

    // MailerLite lets you create/update a subscriber and assign groups in one call.
    const mlRes = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
        groups: [groupId],
      }),
    });

    if (!mlRes.ok) {
      const text = await mlRes.text().catch(() => "");
      return NextResponse.json(
        { error: `MailerLite failed (${mlRes.status}): ${text || "Unknown error"}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, mailerlite: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Unexpected error." },
      { status: 500 }
    );
  }
}
