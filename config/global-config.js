const Config = {
  pagination: {
    pageSize: 6,
    morePostsSize: 6,
    featuredPostsSize: 4
  },
  algoliaIndexes: [
    {
      indexName: 'addict-ru',
      locale: 'ru',
      querySuggestionsIndexName: 'addict-ru_query_suggestions'
    },
    {
      indexName: 'addict-pl',
      locale: 'pl',
      querySuggestionsIndexName: 'addict-pl_query_suggestions'
    }
  ],
  menuLinks: [
    { href: '/', title: 'home' },
    { href: '/blog/page/1', title: 'blog' },
    { href: '/blog/authors-plus-tags', title: 'authors+tags' },
    { href: '/about', title: 'about' }
  ]
};

module.exports = Config;
