"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const GA_ID = process.env.NEXT_PUBLIC_GTAG_ID;

  useEffect(() => {
    if (!GA_ID) return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    // @ts-ignore
    window.gtag?.("event", "page_view", {
      page_path: url,
    });
  }, [pathname, searchParams, GA_ID]);

  return null;
}
