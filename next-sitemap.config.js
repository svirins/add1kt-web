/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
  changefreq: "weekly",
  priority: 0.7,
  alternateRefs: [
    {
      href: process.env.SITE_URL,
      hreflang: "ru",
    },
    {
      href: process.env.SITE_ALT_URL,
      hreflang: "pl",
    },
  ],
};
