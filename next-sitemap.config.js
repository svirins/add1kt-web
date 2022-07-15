/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://addict.cf",
  changefreq: "weekly",
  priority: 0.7,
  generateRobotsTxt: true,
  alternateRefs: [
    {
      href: "https://addict.cf",
      hreflang: "ru",
    },
    {
      href: "https://addict.cf/pl",
      hreflang: "pl",
    },
  ],
};
