import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  let body: any = null;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const kind = String(body?.kind ?? "");
  const targetId = String(body?.targetId ?? "");
  const source = String(body?.source ?? "");

  if (!["job", "article"].includes(kind)) return NextResponse.json({ ok: false }, { status: 400 });
  if (!targetId || targetId === "undefined") return NextResponse.json({ ok: false }, { status: 400 });
  if (!["board", "newsletter"].includes(source)) return NextResponse.json({ ok: false }, { status: 400 });

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim();
  const ua = req.headers.get("user-agent") || "";

  const ipHash = ip ? crypto.createHash("sha256").update(ip).digest("hex") : null;

  // Fire-and-forget insert; never block UX
  await supabase.from("click_events").insert([
    {
      kind,
      target_id: targetId,
      source,
      ip_hash: ipHash,
      user_agent: ua,
    },
  ]);

  return NextResponse.json({ ok: true });
}
