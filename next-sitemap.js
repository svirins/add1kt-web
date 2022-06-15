/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://addict.cf",
  changefreq: "daily",
  priority: 0.7,
  alternateRefs: [
    {
      href: "https://addict.cf",
      hreflang: "ru",
    },
    {
      href: "https://pl.addict.cf",
      hreflang: "pl",
    },
  ],
};
export default config;
