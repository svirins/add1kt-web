const BEE_REWRITE = {
  source: "/bee.js",
  destination: "https://cdn.splitbee.io/sb.js",
};

const HIVE_REWRITE = {
  source: "/_hive/:slug",
  destination: "https://hive.splitbee.io/:slug",
};

// eslint-disable-next-line import/no-extraneous-dependencies
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ["."],
  },
  swcMinify: true,
  reactStrictMode: true,
  i18n: {
    defaultLocale: "ru",
    locales: ["ru", "pl"],
  },
  images: {
    domains: ["cdn.sanity.io"],
    formats: ["image/webp"],
    loader: "custom",
  },
  async rewrites() {
    return [BEE_REWRITE, HIVE_REWRITE];
  },
  // webpack: (config, { dev, isServer }) => {
  //   // Replace React with Preact only in client production build
  //   if (!dev && !isServer) {
  //     Object.assign(config.resolve.alias, {
  //       react: "preact/compat",
  //       "react-dom/test-utils": "preact/test-utils",
  //       "react-dom": "preact/compat",
  //     });
  //   }

  //   return config;
  // },
});
