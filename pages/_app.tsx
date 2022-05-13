import { DefaultSeo } from 'next-seo';
import { NextIntlProvider } from 'next-intl';
import { usePanelbear } from '@panelbear/panelbear-nextjs';
import 'instantsearch.css/themes/satellite-min.css';
import '@/styles/index.css';

import SEO from '@/config/next-seo.config';

function MyApp({ Component, pageProps }) {
  usePanelbear(process.env.NEXT_PUBLIC_PANELBEAR_SITE_ID, {
    debug: false
  });
  return (
    <>
      <NextIntlProvider
        messages={pageProps.messages}
        formats={{
          dateTime: {
            short: {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }
          }
        }}
      >
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </NextIntlProvider>
    </>
  );
}

export default MyApp;
