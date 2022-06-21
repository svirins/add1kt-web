/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  changefreq: "weekly",
  priority: 0.7,
  alternateRefs: [
    {
      href: process.env.NEXT_PUBLIC_SITE_URL,
      hreflang: "ru",
    },
    {
      href: process.env.NEXT_PUBLIC_SITE_ALT_URL,
      hreflang: "pl",
    },
  ],
};
