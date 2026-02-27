// scripts/pay-utils.mjs

function normalizeText(text) {
  return (text || "")
    .toString()
    .replace(/\u00a0/g, " ")              // nbsp
    .replace(/[–—]/g, "-")               // en/em dashes
    .replace(/\s+/g, " ")
    .trim();
}

function cleanMoneyChunk(s) {
  return normalizeText(s)
    .replace(/\bUSD\b|\bUS\b|\bCAD\b|\bGBP\b|\bEUR\b/gi, "")
    .replace(/\bper\s+annum\b/gi, "per year")
    .trim();
}

/**
 * Shared pay parser for ALL sources.
 * Return: { has_pay: boolean, pay_extracted: string|null }
 */
export function extractPayFromText(input) {
  const t = normalizeText(input);
  if (!t) return { has_pay: false, pay_extracted: null };

  // Strong pay signals (used only as fallback)
  const signalRegex =
    /(\$|£|€|\bcompensation\b|\bsalary\b|\bpay\b|\bbase\b|\bOTE\b|\bon[-\s]?target\b|\bper hour\b|\bper year\b|\bannual(?:ly)?\b|\b\/hr\b|\bhourly\b|\bcomp\b)/i;

  // 1) BEST CASE: explicit range with currency on left, optional currency on right
  // Examples:
  //   $130,000 - $200,000
  //   $130k-$200k
  //   $70/hr - $90/hr
  //   $120,000 - 150,000   (no $ on right)
  //   USD 120,000 - 150,000
  //   €90k - €110k
  const rangeRegex1 =
    /(?:USD\s*)?([\$£€])\s*(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)(\s*[kK])?\s*(?:-|to)\s*(?:USD\s*)?([\$£€])?\s*(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)(\s*[kK])?(?:\s*(\/hr|\/hour|per hour|hour|hr|per year|year|annually|annual))?/i;

  let m = t.match(rangeRegex1);
  if (m) {
    const leftSym = m[1];
    const leftNum = m[2];
    const leftK = m[3] ? m[3].trim() : "";
    const rightSym = m[4] || leftSym; // if missing, assume same currency
    const rightNum = m[5];
    const rightK = m[6] ? m[6].trim() : "";
    const unit = m[7] ? ` ${m[7].trim()}` : "";

    const extracted = cleanMoneyChunk(
      `${leftSym}${leftNum}${leftK} - ${rightSym}${rightNum}${rightK}${unit}`
    );

    return { has_pay: true, pay_extracted: extracted };
  }

  // 2) Range WITHOUT currency (common in Lever): "120k - 150k" or "120,000 - 150,000"
  // We only accept this if we see "salary/comp/pay" within ~80 chars nearby to avoid false positives.
  const rangeRegex2 =
    /(\d{2,3}(?:,\d{3})+|\d{2,3}(?:\.\d+)?)(\s*[kK])?\s*(?:-|to)\s*(\d{2,3}(?:,\d{3})+|\d{2,3}(?:\.\d+)?)(\s*[kK])?(?:\s*(\/hr|\/hour|per hour|hour|hr|per year|year|annually|annual))?/i;

  m = t.match(rangeRegex2);
  if (m) {
    const idx = m.index ?? -1;
    const windowStart = Math.max(0, idx - 80);
    const windowEnd = Math.min(t.length, idx + (m[0]?.length || 0) + 80);
    const window = t.slice(windowStart, windowEnd);

    if (signalRegex.test(window)) {
      const left = `${m[1]}${m[2] ? m[2].trim() : ""}`;
      const right = `${m[3]}${m[4] ? m[4].trim() : ""}`;
      const unit = m[5] ? ` ${m[5].trim()}` : "";
      const extracted = cleanMoneyChunk(`${left} - ${right}${unit}`);
      return { has_pay: true, pay_extracted: extracted };
    }
  }

  // 3) Single value with currency (still useful)
  // Examples: "$150,000", "€95k", "USD $140k"
  const singleRegex =
    /(?:USD\s*)?([\$£€])\s*(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)(\s*[kK])?(?:\s*(\/hr|\/hour|per hour|hour|hr|per year|year|annually|annual))?/i;

  m = t.match(singleRegex);
  if (m) {
    const extracted = cleanMoneyChunk(
      `${m[1]}${m[2]}${m[3] ? m[3].trim() : ""}${m[4] ? ` ${m[4].trim()}` : ""}`
    );
    return { has_pay: true, pay_extracted: extracted };
  }

  // 4) Fallback: pay mentioned but not extractable
  if (signalRegex.test(t)) {
    return { has_pay: true, pay_extracted: "Pay mentioned (see listing)" };
  }

  return { has_pay: false, pay_extracted: null };
}
