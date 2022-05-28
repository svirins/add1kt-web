export const globalConfig = {
  pagination: {
    pageSize: 6,
    morePostsSize: 6,
    featuredPostsSize: 4
  },
  algoliaIndexes: [
    {
      indexName: 'addict-ru',
      locale: 'ru',
      querySuggestionsIndexName: 'addict-ru_query_suggestions'
    },
    {
      indexName: 'addict-pl',
      locale: 'pl',
      querySuggestionsIndexName: 'addict-pl_query_suggestions'
    }
  ],
  menuLinks: [
    { href: '/', title: 'home' },
    { href: '/blog/p/1', title: 'blog' },
    { href: '/categories', title: 'categories' },
    { href: '/about', title: 'about' }
  ]
};

export const sanityConfig = {
  /**
   * Find your project ID and dataset in `sanity.json` in your studio project.
   * These are considered “public”, but you can use environment variables
   * if you want differ between local dev and production.
   *
   * https://nextjs.org/docs/basic-features/environment-variables
   **/
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2021-10-21', // Learn more: https://www.sanity.io/docs/api-versioning
  /**
   * Set useCdn to `false` if your application require the freshest possible
   * data always (potentially slightly slower and a bit more expensive).
   * Authenticated request (like preview) will always bypass the CDN
   **/
  useCdn: process.env.NODE_ENV === 'production'
};

export const seoConfig = {
  title: '' ,
  description: '',
  canonical: '',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: '',
    title: '',
    description: '',
    images: [
      {
        url: '',
        alt: '',
        width: 1280,
        height: 720
      }
    ]
  },
  twitter: {
    handle: '@svirins',
    site: '@svirins',
    cardType: '@svirins'
  }
};
