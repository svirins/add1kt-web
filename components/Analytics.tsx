import { globalConfig } from '@/config/global.config';
import Script from 'next/script';

export const Analytics: React.FC = () =>
  typeof window != 'undefined' &&
  window.location.href.includes(globalConfig.siteUrl) ? (
    <Script src="/bee.js" data-api="/_hive" strategy="afterInteractive" />
  ) : null;
