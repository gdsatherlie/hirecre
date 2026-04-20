// HireCRE salary model — a simple, defensible framework for estimating
// total compensation for common commercial real estate roles.
//
// IMPORTANT: these are rough market bands, not a benchmark dataset.
// The estimator exists as a free tool and a reference point. Actual
// comp varies widely by firm size, fund performance, and individual
// negotiation.

export type Role =
  | "analyst"
  | "associate"
  | "senior-associate"
  | "vice-president"
  | "principal";

export type Seat =
  | "repe"
  | "debt-fund"
  | "bank-credit"
  | "brokerage"
  | "reit-corp"
  | "asset-management"
  | "development";

export type StateBucket = "ny-sf" | "major-metro" | "secondary" | "remote-or-small";

export type Estimate = {
  baseLow: number;
  baseHigh: number;
  bonusLow: number;
  bonusHigh: number;
  carryLow: number;
  carryHigh: number;
  totalLow: number;
  totalHigh: number;
  carryApplicable: boolean;
};

/** Base salary midpoints by role + seat, in 2026 USD. */
const BASE_TABLE: Record<Role, Record<Seat, number>> = {
  analyst: {
    repe: 100000,
    "debt-fund": 105000,
    "bank-credit": 80000,
    brokerage: 55000,
    "reit-corp": 75000,
    "asset-management": 75000,
    development: 75000,
  },
  associate: {
    repe: 130000,
    "debt-fund": 130000,
    "bank-credit": 105000,
    brokerage: 75000,
    "reit-corp": 105000,
    "asset-management": 105000,
    development: 105000,
  },
  "senior-associate": {
    repe: 165000,
    "debt-fund": 160000,
    "bank-credit": 135000,
    brokerage: 100000,
    "reit-corp": 140000,
    "asset-management": 135000,
    development: 140000,
  },
  "vice-president": {
    repe: 220000,
    "debt-fund": 210000,
    "bank-credit": 175000,
    brokerage: 135000,
    "reit-corp": 190000,
    "asset-management": 180000,
    development: 195000,
  },
  principal: {
    repe: 300000,
    "debt-fund": 280000,
    "bank-credit": 235000,
    brokerage: 185000,
    "reit-corp": 260000,
    "asset-management": 240000,
    development: 270000,
  },
};

/** Target bonus percentage (of base) midpoints by role + seat. */
const BONUS_TARGET_PCT: Record<Role, Record<Seat, number>> = {
  analyst: {
    repe: 0.35,
    "debt-fund": 0.3,
    "bank-credit": 0.15,
    brokerage: 0.5,
    "reit-corp": 0.2,
    "asset-management": 0.2,
    development: 0.2,
  },
  associate: {
    repe: 0.75,
    "debt-fund": 0.6,
    "bank-credit": 0.3,
    brokerage: 0.8,
    "reit-corp": 0.35,
    "asset-management": 0.35,
    development: 0.35,
  },
  "senior-associate": {
    repe: 1.0,
    "debt-fund": 0.8,
    "bank-credit": 0.4,
    brokerage: 1.0,
    "reit-corp": 0.5,
    "asset-management": 0.45,
    development: 0.5,
  },
  "vice-president": {
    repe: 1.25,
    "debt-fund": 1.0,
    "bank-credit": 0.55,
    brokerage: 1.3,
    "reit-corp": 0.65,
    "asset-management": 0.6,
    development: 0.7,
  },
  principal: {
    repe: 1.5,
    "debt-fund": 1.3,
    "bank-credit": 0.7,
    brokerage: 1.8,
    "reit-corp": 0.9,
    "asset-management": 0.8,
    development: 1.0,
  },
};

/** Annual expected value of carry by role (seats that offer it). */
const CARRY_EV: Record<Role, { low: number; high: number }> = {
  analyst: { low: 0, high: 0 },
  associate: { low: 0, high: 20000 },
  "senior-associate": { low: 20000, high: 100000 },
  "vice-president": { low: 60000, high: 300000 },
  principal: { low: 150000, high: 1500000 },
};

/** Geography multiplier for base salary. */
const GEO_MULT: Record<StateBucket, number> = {
  "ny-sf": 1.15,
  "major-metro": 1.0,
  secondary: 0.85,
  "remote-or-small": 0.9,
};

const CARRY_SEATS: Seat[] = ["repe", "debt-fund"];

/** Map a US state abbreviation to one of the geo buckets. */
export function stateToBucket(abbrev: string): StateBucket {
  const a = (abbrev || "").toUpperCase();
  if (a === "NY" || a === "CA") return "ny-sf";
  if (["MA", "IL", "WA", "CT", "NJ", "DC", "MD"].includes(a)) return "major-metro";
  if (!a) return "remote-or-small";
  return "secondary";
}

/**
 * Given a role + seat + experience + geography, produce a base / bonus /
 * carry / total range. Uses a simple symmetric ±20% band around the base
 * midpoint, scaled by geography and experience, and a symmetric ±30%
 * band around the bonus midpoint for the same role.
 */
export function estimateCompensation(input: {
  role: Role;
  seat: Seat;
  yearsExperience: number;
  state: string; // US state abbreviation
}): Estimate {
  const { role, seat, yearsExperience, state } = input;
  const bucket = stateToBucket(state);
  const geoMult = GEO_MULT[bucket];

  // Experience tilt: every year above the role's floor adds ~2% up to +10%.
  const floorByRole: Record<Role, number> = {
    analyst: 0,
    associate: 2,
    "senior-associate": 4,
    "vice-president": 7,
    principal: 12,
  };
  const extraYears = Math.max(0, yearsExperience - floorByRole[role]);
  const expMult = 1 + Math.min(0.1, extraYears * 0.02);

  const baseMid = BASE_TABLE[role][seat] * geoMult * expMult;
  const baseLow = Math.round(baseMid * 0.85);
  const baseHigh = Math.round(baseMid * 1.15);

  const bonusPct = BONUS_TARGET_PCT[role][seat];
  const bonusMid = baseMid * bonusPct;
  const bonusLow = Math.round(bonusMid * 0.7);
  const bonusHigh = Math.round(bonusMid * 1.3);

  const carryApplicable = CARRY_SEATS.includes(seat);
  const carryLow = carryApplicable ? CARRY_EV[role].low : 0;
  const carryHigh = carryApplicable ? CARRY_EV[role].high : 0;

  return {
    baseLow,
    baseHigh,
    bonusLow,
    bonusHigh,
    carryLow,
    carryHigh,
    totalLow: baseLow + bonusLow + carryLow,
    totalHigh: baseHigh + bonusHigh + carryHigh,
    carryApplicable,
  };
}

export const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: "analyst", label: "Analyst" },
  { value: "associate", label: "Associate" },
  { value: "senior-associate", label: "Senior Associate" },
  { value: "vice-president", label: "Vice President" },
  { value: "principal", label: "Principal / MD" },
];

export const SEAT_OPTIONS: { value: Seat; label: string }[] = [
  { value: "repe", label: "Real Estate Private Equity (REPE)" },
  { value: "debt-fund", label: "Debt Fund" },
  { value: "bank-credit", label: "Bank CRE Credit" },
  { value: "brokerage", label: "Brokerage (Investment Sales / Capital Markets)" },
  { value: "reit-corp", label: "Public REIT / Corporate" },
  { value: "asset-management", label: "Asset Management" },
  { value: "development", label: "Development" },
];
