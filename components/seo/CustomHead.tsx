import Head from 'next/head';
import { useRouter } from 'next/router';

function CustomHead({ contentType, customMeta }) {
  const router = useRouter();

  const meta = {
    title: 'translated text',
    description: `translated text`,
    image: 'https://leerob.io/static/images/banner.png',
    type: 'website',
    ...customMeta
  };
  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content="follow, index" />
      <meta content={meta.description} name="description" />
      <meta property="og:url" content={`https://addict.cf${router.asPath}`} />
      <link rel="canonical" href={`addict.cf${router.asPath}`} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="Dzmitry Sviryn" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@svirins" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      {meta.date && (
        <meta property="article:published_time" content={meta.date} />
      )}
    </Head>
  );
}

export default CustomHead;
