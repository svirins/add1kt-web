const { withPlaiceholder } = require('@plaiceholder/next');
/**
 * @type {import('next').NextConfig}
 */
module.exports = withPlaiceholder({
  swcMinify: true,
  reactStrictMode: true,

  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'pl']
  },
  images: {
    domains: ['images.ctfassets.net']
  },
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat'
      });
    }

    return config;
  }
});
