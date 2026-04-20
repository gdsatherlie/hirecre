"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  estimateCompensation,
  ROLE_OPTIONS,
  SEAT_OPTIONS,
  type Role,
  type Seat,
} from "@/lib/salary-model";
import { US_STATES } from "@/lib/us-states";

function fmt(n: number): string {
  return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export default function SalaryCalculatorClient() {
  const [role, setRole] = useState<Role>("associate");
  const [seat, setSeat] = useState<Seat>("repe");
  const [years, setYears] = useState<number>(3);
  const [stateAbbrev, setStateAbbrev] = useState<string>("NY");

  const estimate = useMemo(
    () =>
      estimateCompensation({
        role,
        seat,
        yearsExperience: years,
        state: stateAbbrev,
      }),
    [role, seat, years, stateAbbrev]
  );

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* Inputs */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="role"
              className="mb-1 block text-xs font-semibold text-gray-700"
            >
              Role level
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
            >
              {ROLE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="seat"
              className="mb-1 block text-xs font-semibold text-gray-700"
            >
              Seat type
            </label>
            <select
              id="seat"
              value={seat}
              onChange={(e) => setSeat(e.target.value as Seat)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
            >
              {SEAT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="state"
              className="mb-1 block text-xs font-semibold text-gray-700"
            >
              US state (for geography adjustment)
            </label>
            <select
              id="state"
              value={stateAbbrev}
              onChange={(e) => setStateAbbrev(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
            >
              {US_STATES.map((s) => (
                <option key={s.abbrev} value={s.abbrev}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="years"
              className="mb-1 block text-xs font-semibold text-gray-700"
            >
              Years of CRE experience: {years}
            </label>
            <input
              id="years"
              type="range"
              min={0}
              max={20}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>10</span>
              <span>20</span>
            </div>
          </div>
        </div>
      </form>

      {/* Output */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Estimated total compensation
        </div>
        <div className="mt-2 text-3xl font-semibold text-gray-900">
          {fmt(estimate.totalLow)} – {fmt(estimate.totalHigh)}
        </div>
        <div className="mt-1 text-xs text-gray-500">
          Rough 2026 market band. Not a benchmark or guarantee.
        </div>

        <div className="mt-6 space-y-3 text-sm">
          <Row label="Base salary" low={estimate.baseLow} high={estimate.baseHigh} />
          <Row label="Target bonus" low={estimate.bonusLow} high={estimate.bonusHigh} />
          {estimate.carryApplicable ? (
            <Row
              label="Expected annual carry (vested seats)"
              low={estimate.carryLow}
              high={estimate.carryHigh}
            />
          ) : null}
        </div>

        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-xs leading-5 text-blue-900">
          <strong>How to read this:</strong> We don&apos;t have access to
          proprietary benchmark data — the ranges above reflect our view of
          2026 CRE market bands based on public postings, published
          benchmarks, and practitioner input. Your actual offer will be
          driven by firm size, fund vintage, and individual negotiation.
          Compare against the{" "}
          <Link href="/commercial-real-estate-salary-guide" className="underline">
            salary guide
          </Link>{" "}
          and{" "}
          <Link href="/blog/negotiating-cre-compensation" className="underline">
            negotiation guide
          </Link>
          .
        </div>
      </div>
    </div>
  );
}

function Row({ label, low, high }: { label: string; low: number; high: number }) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-gray-100 pt-3 first:border-0 first:pt-0">
      <div className="text-sm text-gray-700">{label}</div>
      <div className="text-right text-sm font-semibold text-gray-900">
        {fmt(low)} – {fmt(high)}
      </div>
    </div>
  );
}
