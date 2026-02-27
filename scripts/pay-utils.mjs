// scripts/pay-utils.mjs

function normalizeText(text) {
  return (text || "")
    .toString()
    .replace(/<[^>]+>/g, " ")
    .replace(/\u00a0/g, " ")
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function clean(s) {
  return (s || "").replace(/\s+/g, " ").trim();
}

function toNumber(amountStr, hasK) {
  if (!amountStr) return NaN;
  const n = Number(amountStr.replace(/,/g, ""));
  if (!Number.isFinite(n)) return NaN;
  return hasK ? n * 1000 : n;
}

function isLikelyHourlyContext(ctx) {
  return /(\/hr|\/hour|per hour|hourly)\b/i.test(ctx);
}

function isLikelyAnnualContext(ctx) {
  return /(per year|yearly|annual|annually|salary|base salary|compensation)\b/i.test(ctx);
}

export function extractPayFromText(input) {
  const t = normalizeText(input);
  if (!t) return { has_pay: false, pay_extracted: null };

  // Strong signal words (fallback only)
  const signalRegex =
    /(\$|£|€|\bsalary\b|\bcompensation\b|\bpay\b|\bbase\b|\bOTE\b|\bannual\b|\bannually\b|\bper year\b|\bper hour\b|\b\/hr\b|\bhourly\b)/i;

  // =========================
  // RANGE WITH CURRENCY
  // $120,000 - $150,000
  // $120k - $150k
  // $35/hr - $50/hr
  // $120,000 - 150,000 (missing $ on right)
  // =========================
  const currencyRange =
    /([\$£€])\s*(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)(\s*[kK])?\s*(?:-|to)\s*([\$£€])?\s*(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)(\s*[kK])?(?:\s*(\/hr|\/hour|per hour|hourly|per year|yearly|annual|annually))?/i;

  let m = t.match(currencyRange);
  if (m) {
    const leftSym = m[1];
    const leftNum = m[2];
    const leftK = !!m[3];
    const rightSym = m[4] || leftSym;
    const rightNum = m[5];
    const rightK = !!m[6];
    const unit = m[7] ? m[7].trim() : "";

    const leftVal = toNumber(leftNum, leftK);
    const rightVal = toNumber(rightNum, rightK);

    // Context window for sanity checks
    const idx = m.index ?? 0;
    const window = t.slice(Math.max(0, idx - 60), Math.min(t.length, idx + 120));

    const hourly = unit ? isLikelyHourlyContext(unit) : isLikelyHourlyContext(window);
    const annual = unit ? isLikelyAnnualContext(unit) : isLikelyAnnualContext(window);

    // Reject tiny dollar amounts unless clearly hourly
    // - hourly valid range: $10/hr to $500/hr
    // - annual valid range: $15,000 to $2,000,000
    if (hourly) {
      if (leftVal < 10 || rightVal < 10 || leftVal > 500 || rightVal > 500) {
        // not plausible hourly comp
        return signalRegex.test(window)
          ? { has_pay: true, pay_extracted: "Pay mentioned (see listing)" }
          : { has_pay: false, pay_extracted: null };
      }
    } else {
      // treat as annual by default if $ + big numbers, otherwise require annual-ish context
      if (!annual && leftVal < 1000 && rightVal < 1000) {
        // very likely $103 / $108 nonsense
        return signalRegex.test(window)
          ? { has_pay: true, pay_extracted: "Pay mentioned (see listing)" }
          : { has_pay: false, pay_extracted: null };
      }
      if (leftVal < 15000 || rightVal < 15000 || leftVal > 2000000 || rightVal > 2000000) {
        // outside plausible annual salary bounds
        return signalRegex.test(window)
          ? { has_pay: true, pay_extracted: "Pay mentioned (see listing)" }
          : { has_pay: false, pay_extracted: null };
      }
    }

    const leftText = `${leftSym}${leftNum}${leftK ? "k" : ""}`;
    const rightText = `${rightSym}${rightNum}${rightK ? "k" : ""}`;
    return {
      has_pay: true,
      pay_extracted: clean(`${leftText} - ${rightText}${unit ? " " + unit : ""}`),
    };
  }

  // =========================
  // SINGLE VALUE WITH CURRENCY
  // $120,000 or $120k
  // $45/hr
  // =========================
  const single =
    /([\$£€])\s*(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)(\s*[kK])?(?:\s*(\/hr|\/hour|per hour|hourly|per year|yearly|annual|annually))?/i;

  m = t.match(single);
  if (m) {
    const sym = m[1];
    const num = m[2];
    const hasK = !!m[3];
    const unit = m[4] ? m[4].trim() : "";

    const val = toNumber(num, hasK);
    const idx = m.index ?? 0;
    const window = t.slice(Math.max(0, idx - 60), Math.min(t.length, idx + 120));

    const hourly = unit ? isLikelyHourlyContext(unit) : isLikelyHourlyContext(window);
    const annual = unit ? isLikelyAnnualContext(unit) : isLikelyAnnualContext(window);

    if (hourly) {
      if (val < 10 || val > 500) {
        return signalRegex.test(window)
          ? { has_pay: true, pay_extracted: "Pay mentioned (see listing)" }
          : { has_pay: false, pay_extracted: null };
      }
    } else {
      // reject tiny values like $103 unless annual context AND plausible
      if (val < 15000 || val > 2000000) {
        return signalRegex.test(window)
          ? { has_pay: true, pay_extracted: "Pay mentioned (see listing)" }
          : { has_pay: false, pay_extracted: null };
      }
      if (!annual && val < 100000) {
        // if it's under 100k with no annual context, could be noise; be conservative
        return signalRegex.test(window)
          ? { has_pay: true, pay_extracted: "Pay mentioned (see listing)" }
          : { has_pay: false, pay_extracted: null };
      }
    }

    return {
      has_pay: true,
      pay_extracted: clean(`${sym}${num}${hasK ? "k" : ""}${unit ? " " + unit : ""}`),
    };
  }

  // Fallback: pay mentioned but not extractable
  if (signalRegex.test(t)) {
    return { has_pay: true, pay_extracted: "Pay mentioned (see listing)" };
  }

  return { has_pay: false, pay_extracted: null };
}
