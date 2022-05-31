const STUDIO_REWRITE = {
  source: '/studio/:path*',
  destination:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3333/studio/:path*'
      : '/studio/index.html'
};
const BEE_REWRITE = {
  source: '/bee.js',
  destination: 'https://cdn.splitbee.io/sb.js'
};

const HIVE_REWRITE = {
  source: '/_hive/:slug',
  destination: 'https://hive.splitbee.io/:slug'
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
  swcMinify: true,
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'pl']
  },
  images: {
    images: {
      domains: ['cdn.sanity.io']
    }
  },
  async rewrites() {
    return [STUDIO_REWRITE, BEE_REWRITE, HIVE_REWRITE];
  },
  webpack: (config, { dev, isServer }) => {
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
