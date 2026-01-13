"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Analytics() {
  const pathname = usePathname();
  const GA_ID = process.env.NEXT_PUBLIC_GTAG_ID;

  useEffect(() => {
    if (!GA_ID) return;

    // Track page views on route change
    // @ts-ignore
    window.gtag?.("event", "page_view", {
      page_path: pathname,
    });
  }, [pathname, GA_ID]);

  return null;
}
