// https://www.npmjs.com/package/next-sitemap

module.exports = {
  siteUrl: '',
  generateRobotsTxt: true, // (optional)
  robotsTxtOptions: {
    policies: [{ userAgent: '*', disallow: '/api' }],
    additionalSitemaps: ['@/pages/server-sitemap.xml']
  },
  exclude: ['/api/*', '/server-sitemap.xml']
};
