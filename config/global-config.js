/*
 * This Config object is used throughout the application to
 * personalise your code and preferences for how you would
 * like things to work.
 *
 * For example, use the Config object to configure your menu links
 * without editing HTML, or change the page size on /blog without
 * touching any of the functional code.
 *
 */

const SITE_URL = 'https://localhost:3000';

const Config = {
  site: {
    owner: 'A. Blogger',
    title: 'My new Next.js + Contentful blog site',
    domain: 'nextjs--blog-starter.vercel.app',
    email: 'example@example.com'
  },
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
    { href: '/blog/page/1', title: 'blog' },
    { href: '/blog/authors-plus-tags', title: 'authors+tags' },
    { href: '/about', title: 'about' }
  ]
};

module.exports = Config;
