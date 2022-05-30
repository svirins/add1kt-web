import Script from 'next/script';
import { siteMeta } from '@/lib/config'
export const Analytics: React.VFC = () =>
  typeof window != 'undefined' && window.location.href.includes(siteMeta.siteUrl) ? (
    <Script src="/bee.js" data-api="/_hive" strategy="afterInteractive" />
  ) : null;
