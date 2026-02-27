// scripts/pay-utils.mjs
export function extractPayFromText(text) {
  const t = (text || "").replace(/\s+/g, " ").trim();
  if (!t) return { has_pay: false, pay_extracted: null };

  const rangeRegex =
    /(\$)\s?(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)(\s?(k|K))?\s*(?:-|–|—|to)\s*(\$)\s?(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)(\s?(k|K))?(?:\s*(\/hr|\/hour|per hour|hour|hr))?/;

  const m = t.match(rangeRegex);
  if (m) {
    const cleaned = m[0].replace(/\s+/g, " ").replace(/\bto\b/i, "-").trim();
    return { has_pay: true, pay_extracted: cleaned };
  }

  const signalRegex =
    /(\$|\bcompensation\b|\bsalary\b|\bpay\b|\bbase\b|\bOTE\b|\bon[-\s]?target\b|\bper hour\b|\b\/hr\b|\bhourly\b|\bcomp\b)/i;

  if (signalRegex.test(t)) {
    return { has_pay: true, pay_extracted: "Pay mentioned (see listing)" };
  }

  return { has_pay: false, pay_extracted: null };
}
