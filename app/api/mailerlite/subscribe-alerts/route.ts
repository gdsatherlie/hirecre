import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email || "").trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const token = process.env.MAILERLITE_API_TOKEN;
    const groupIdRaw = process.env.MAILERLITE_ALERTS_GROUP_ID;

    if (!token) {
      return NextResponse.json({ error: "MAILERLITE_API_TOKEN missing" }, { status: 500 });
    }
    if (!groupIdRaw) {
      return NextResponse.json({ error: "MAILERLITE_ALERTS_GROUP_ID missing" }, { status: 500 });
    }

    // IMPORTANT: MailerLite requires group id to be a NUMBER
    const groupId = Number(groupIdRaw);
    if (!Number.isFinite(groupId)) {
      return NextResponse.json(
        { error: "MAILERLITE_ALERTS_GROUP_ID must be a number" },
        { status: 500 }
      );
    }

    const resp = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // groups MUST be numeric array
      body: JSON.stringify({ email, groups: [groupId] }),
    });

    const data = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      return NextResponse.json(
        { error: "MailerLite error", status: resp.status, details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, data });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
