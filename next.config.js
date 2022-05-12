const { withPlaiceholder } = require('@plaiceholder/next');

module.exports = withPlaiceholder({
  swcMinify: true,
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'pl']
  },
  images: {
    domains: ['images.ctfassets.net']
  }
});
