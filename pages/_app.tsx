import 'styles/global.css';

import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import { NextIntlProvider } from 'next-intl';
import { usePanelbear } from '@panelbear/panelbear-nextjs';

import SEO from '@/config/next-seo.config';

function App({ Component, pageProps }: AppProps) {
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
              month: 'short',
              year: 'numeric'
            }
          }
        }}
      >
        {' '}
        <ThemeProvider attribute="class">
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </ThemeProvider>
      </NextIntlProvider>
    </>
  );
}

export default App;
