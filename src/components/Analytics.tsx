import Script from "next/script";

import { globalConfig } from "@/utils/global.config";

export function Analytics() {
  return typeof window !== "undefined" &&
    window.location.href.includes(globalConfig.siteUrl) ? (
    <Script src="/bee.js" data-api="/_hive" strategy="afterInteractive" />
  ) : null;
}
