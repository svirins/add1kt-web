export const GLOBAL_CONFIG = {
  pagination: {
    pageSize: 6,
    morePostsSize: 6,
    featuredPostsSize: 6,
    allPostsSize: 50,
  },
  images: {
    defaultPostImageWidth: 1024,
    defaultPostImageHeight: 600,
    defaultPostPreviewImageWidth: 640,
    defaultPostImagePreviewHeight: 376,
    defaultAvatarImageWidthHeight: 44,
    defaultRoundImageWidthHeight: 256,
    defaultQuality: 80,
  },
  menuLinks: [
    { href: "/", title: "home" },
    { href: "/blog/p/1", title: "blog" },
    { href: "/categories", title: "categories" },
    { href: "/about", title: "about" },
  ],
  siteUrl: "https://addict.cf",
  youtubeLink: "https://www.youtube.com/channel/UCg83jkm7aM3OKTAWMoSpf2A/",
  facebookLink: "https://www.facebook.com/doktorGrin/",
  telegramLink: "https://t.me/vgrean",
  githubLink: "https://github.com/zvirinz/add1kt-web",
  rssLink: "/rss/feed.xml",
  trimmedHeaderLength: 55,
};

export const LOCALIZED_ALGOLIA_INDICES = [
  {
    indexName: "addict-ru",
    locale: "ru",
  },
  {
    indexName: "addict-pl",
    locale: "pl",
  },
];

export const SANITY_CONFIG = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2021-10-21",
};

export const SANITY_CONFIG_ALGOLIA = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2021-03-25",
  useCdn: false,
};

export const LOCALIZED_RSS_DATA = [
  {
    siteName: "Addict.cf. Блог об аддикциях",
    siteDescription:
      "Аддикция — это поведенческий паттерн, включающий в себя злоупотребление психоактивными или опасными веществами, а также определенными практиками, которые вызывают привыкание.",
    locale: "ru",
    url: "https://addict.cf",
  },
  {
    siteName: "Addict.cf. Blog o uzależnieniach",
    siteDescription:
      "Uzależnienie to wzorzec zachowania polegający na nadużywaniu substancji psychoaktywnych lub niebezpiecznych oraz na stosowaniu pewnych praktyk uzależniających.",
    locale: "pl",
    url: "https://addict.cf/pl",
  },
];

export const AUTHOR = {
  name: "Valeriy Grean",
  email: "vgrean@gmail.com",
  link: "https://twitter.com",
};

export const SEO = {
  title: "Addict.cf. Блог об аддикциях",
  description:
    "Аддикция — это поведенческий паттерн, включающий в себя злоупотребление психоактивными или опасными веществами, а также определенными практиками, которые вызывают привыкание.",
  openGraph: {
    titleTemplate: "Addict.cf. Блог об аддикциях",
    description:
      "Аддикция — это поведенческий паттерн, включающий в себя злоупотребление психоактивными или опасными веществами, а также определенными практиками, которые вызывают привыкание.",
    type: "website",
    url: "https://www.addict.cf/",
    site_name: "Addict.cf. Блог об аддикциях",
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
};
