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
  pageMeta: {
    openGraph: {
      twitterUser: 'svirins'
    },
    home: {
      url: SITE_URL,
      slug: '/'
    },
    blogIndex: {
      url: `${SITE_URL}/blog`,
      slug: '/blog'
    },
    blogIndexPage: {
      slug: '/blog/page/[page]'
    },
    post: {
      slug: '/blog/[slug]'
    },
    notFound: {
      url: SITE_URL,
      slug: '/404'
    }
  },
  pagination: {
    pageSize: 6,
    morePostsSize: 2,
    homePostsSize: 4,
    queryLimit: 30
  },
  menuLinks: [
    {
      displayName: 'Home',
      path: '/'
    },
    {
      displayName: 'Blog',
      path: '/blog'
    }
  ]
};

export default Config;
