// scripts/pay-utils.mjs

/**
 * EXACT pay parsing logic to be shared across all sources (Greenhouse + Lever + others).
 * Return shape must match your Supabase columns:
 *   { has_pay: boolean, pay_extracted: string|null }
 */
export function extractPayFromText(text) {
  const t = (text || "").replace(/\s+/g, " ").trim();
  if (!t) return { has_pay: false, pay_extracted: null };

  // Range patterns:
  // $130,000 - $200,000
  // $130k-$200k
  // $70/hr - $90/hr
  // $100,000 to $120,000
  const rangeRegex =
    /(\$)\s?(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)(\s?(k|K))?\s*(?:-|–|—|to)\s*(\$)\s?(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)(\s?(k|K))?(?:\s*(\/hr|\/hour|per hour|hour|hr))?/;

  const m = t.match(rangeRegex);
  if (m) {
    const cleaned = m[0].replace(/\s+/g, " ").replace(/\bto\b/i, "-").trim();
    return { has_pay: true, pay_extracted: cleaned };
  }

  // Strong signals even if no clean range
  const signalRegex =
    /(\$|\bcompensation\b|\bsalary\b|\bpay\b|\bbase\b|\bOTE\b|\bon[-\s]?target\b|\bper hour\b|\b\/hr\b|\bhourly\b|\bcomp\b)/i;

  if (signalRegex.test(t)) {
    return { has_pay: true, pay_extracted: "Pay mentioned (see listing)" };
  }

  return { has_pay: false, pay_extracted: null };
}
