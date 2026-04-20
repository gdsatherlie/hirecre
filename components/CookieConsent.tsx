"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Lightweight cookie/privacy notice. Shows on the first visit, stores
// the user's choice in localStorage, and hides on subsequent visits.
// This is an informational banner, not a full consent management
// platform — AdSense and Google Analytics operate continuously; the
// banner exists to inform visitors and link to /privacy for opt-out
// instructions.

const STORAGE_KEY = "hirecre:cookie-consent:v1";

type ConsentChoice = "accepted" | "declined";

function readChoice(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === "accepted" || v === "declined") return v;
    return null;
  } catch {
    return null;
  }
}

function writeChoice(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // localStorage may be unavailable (private browsing / quota). We
    // deliberately don't surface an error — the banner will re-appear
    // next visit, which is the desired fallback.
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readChoice() === null) setVisible(true);
  }, []);

  if (!visible) return null;

  function handle(choice: ConsentChoice) {
    writeChoice(choice);
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Privacy notice"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 px-4 py-4 shadow-lg backdrop-blur sm:inset-x-auto sm:bottom-4 sm:left-4 sm:max-w-md sm:rounded-2xl sm:border sm:px-5 sm:py-5"
    >
      <div className="text-sm text-gray-800">
        <p className="font-semibold text-gray-900">Privacy notice</p>
        <p className="mt-1 leading-5 text-gray-700">
          HireCRE uses cookies for analytics and ads (Google Analytics +
          AdSense). See our{" "}
          <Link
            href="/privacy"
            className="font-semibold text-blue-700 hover:underline"
          >
            Privacy Policy
          </Link>{" "}
          for details and opt-out instructions.
        </p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => handle("accepted")}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          OK, got it
        </button>
        <button
          type="button"
          onClick={() => handle("declined")}
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
