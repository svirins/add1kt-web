import { DefaultSeo } from 'next-seo';
import { appWithTranslation } from 'next-i18next';
import { usePanelbear } from '@panelbear/panelbear-nextjs';

import '@/styles/index.css';

import SEO from '../next-seo.config';

function MyApp({ Component, pageProps }) {
  usePanelbear(process.env.NEXT_PUBLIC_PANELBEAR_SITE_ID, {
    debug: false
  });
  return (
    <>
      {' '}
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />{' '}
    </>
  );
}

export default appWithTranslation(MyApp);
