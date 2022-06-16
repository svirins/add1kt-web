/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://localhost:3000",
  changefreq: "daily",
  priority: 0.7,
  alternateRefs: [
    {
      href: "https://localhost:3000",
      hreflang: "ru",
    },
    {
      href: "https://pl.localhost:3000",
      hreflang: "pl",
    },
  ],
};
export default config;

// https://addict.cf
// localhost:3000
