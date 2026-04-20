import type { Metadata } from "next";

// Alerts is behind auth — not indexable. Also set canonical to prevent
// query-param variants from showing up as duplicates.
export const metadata: Metadata = {
  title: "Alerts | HireCRE",
  description: "Manage saved searches and job alert preferences.",
  alternates: { canonical: "/alerts" },
  robots: { index: false, follow: true },
};

export default function AlertsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
