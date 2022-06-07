export const globalConfig = {
  pagination: {
    pageSize: 6,
    morePostsSize: 6,
    featuredPostsSize: 6,
    allPostsSize: 50
  },
  menuLinks: [
    { href: '/', title: 'home' },
    { href: '/blog/p/1', title: 'blog' },
    { href: '/categories', title: 'categories' },
    { href: '/about', title: 'about' }
  ],
  siteUrl: 'https://addict.cf',
  youtubeLink: 'https://www.youtube.com/channel/UCg83jkm7aM3OKTAWMoSpf2A/',
  facebookLink: 'https://www.facebook.com/doktorGrin/',
  telegramLink: 'https://t.me/vgrean',
  githubLink: 'https://github.com/zvirinz/grean-app-2022',
  trimmedHeaderLength: 55
};

export const localizedAlgoliaIndices = [
  {
    indexName: 'addict-ru',
    locale: 'ru'
  },
  {
    indexName: 'addict-pl',
    locale: 'pl'
  }
];

export const sanityConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2021-10-21',
  useCdn: false
};

export const sanityConfigForAlgolia = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2021-03-25',
  useCdn: false
};
