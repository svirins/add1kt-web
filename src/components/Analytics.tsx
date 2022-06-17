import Script from "next/script";

import { GLOBAL_CONFIG } from "@/utils/global.config";

export function Analytics() {
  return typeof window !== "undefined" &&
    window.location.href.includes(GLOBAL_CONFIG.siteUrl) ? (
    <Script src="/bee.js" data-api="/_hive" strategy="afterInteractive" />
  ) : null;
}
