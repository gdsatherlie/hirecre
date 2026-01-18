import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(
  _req: Request,
  { params }: { params: { token: string } }
) {
  const token = params?.token;
  if (!token) return NextResponse.redirect(new URL("https://hirecre.com"));

  // Lookup destination
  const { data, error } = await supabase
    .from("redirect_links")
    .select("destination_url")
    .eq("token", token)
    .limit(1)
    .maybeSingle();

  if (error || !data?.destination_url) {
    return NextResponse.redirect(new URL("https://hirecre.com"));
  }

  // Log click event (best effort)
  try {
    const ip = (_req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim();
    const ua = _req.headers.get("user-agent") || "";
    const ipHash = ip ? crypto.createHash("sha256").update(ip).digest("hex") : null;

    await supabase.from("click_events").insert([
      {
        kind: "article",
        target_id: token,
        source: "newsletter",
        ip_hash: ipHash,
        user_agent: ua,
      },
    ]);
  } catch {
    // ignore
  }

  return NextResponse.redirect(data.destination_url);
}
