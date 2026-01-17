import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const token = process.env.MAILERLITE_API_TOKEN;
    const groupId = process.env.MAILERLITE_ALERTS_GROUP_ID;

    if (!token) {
      return NextResponse.json({ error: "Missing MAILERLITE_API_TOKEN" }, { status: 500 });
    }
    if (!groupId) {
      return NextResponse.json({ error: "Missing MAILERLITE_ALERTS_GROUP_ID" }, { status: 500 });
    }

    // Create/upsert subscriber + add to group
    // MailerLite: POST https://connect.mailerlite.com/api/subscribers
    const resp = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        groups: [String(groupId)],
        status: "active",
      }),
    });

    const text = await resp.text();

    if (!resp.ok) {
      return NextResponse.json(
        { error: "MailerLite error", status: resp.status, details: text },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
