const STUDIO_REWRITE = {
  source: '/studio/:path*',
  destination:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3333/studio/:path*'
      : '/studio/index.html'
};

// TODO: implement image sizes

module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'pl']
  },
  images: {
    images: {
      domains: ['cdn.sanity.io'],
      // imageSizes: [24, 64, 300],
      loader: 'custom'
    }
  },
  rewrites: () => [STUDIO_REWRITE],
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
};
