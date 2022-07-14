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
    { href: "/about", title: "about" },
  ],
  siteUrl: "https://addict.cf",
  youtubeLink: "https://www.youtube.com/channel/UCg83jkm7aM3OKTAWMoSpf2A/",
  facebookLink: "https://www.facebook.com/doktorGrin/",
  telegramLink: "https://t.me/vgrean",
  emailLink: "mailto:vgreanGgmail.com",
  githubLink: "https://github.com/zvirinz/grean-app-2022",
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
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "development",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2021-10-21",
};

export const SANITY_CONFIG_ALGOLIA = {
  dataset: "development",
  projectId: "ro6en9ct",
  apiVersion: "2021-03-25",
  useCdn: false,
};

export const LOCALIZED_RSS_DATA = [
  {
    siteName: "addict-ru",
    siteDescription: "addict-ru",
    locale: "ru",
    url: "https://addict.cf",
  },
  {
    siteName: "addict-pl",
    siteDescription: "addict-pl",
    locale: "pl",
    url: "https://pl.addict.cf",
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
    "Аддикция — это навязчивая привычка, которая может спровоцировать психологические заболевания.",
  openGraph: {
    titleTemplate: "Addict.cf. Блог об аддикциях",
    description:
      "Аддикция — это навязчивая привычка, которая может спровоцировать психологические заболевания.",
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
