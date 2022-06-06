import React, { createElement } from 'react';

import { getAlgoliaResults } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch';
import { Autocomplete } from './autocomplete';
import ArticleItem from './articleItem';
import '@algolia/autocomplete-theme-classic';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

const Search = () => {
  return (
    <div>
      <Autocomplete
        openOnFocus={false}
        detachedMediaQuery=""
        placeholder="Search for posts"
        getSources={({ query }) => [
          {
            sourceId: 'posts',
            getItemUrl({ item }) {
              return `/post/${item.slug}`;
            },
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: 'addict-pl',
                    query
                  }
                ]
              });
            },
            templates: {
              item({ item, components }) {
                return <ArticleItem hit={item} components={components} />;
              }
            }
          }
        ]}
      />
    </div>
  );
};

export default Search;
