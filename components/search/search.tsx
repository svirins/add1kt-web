import { createElement } from 'react';
import { useRouter } from 'next/router';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch';

import { useTranslations } from 'next-intl';
import Config from '@/config/global-config';

import { Autocomplete } from '@/components/search/autocomplete';
import { PostItem } from '@/components/search/post-item';

function Search() {
  const { locale } = useRouter();
  const t = useTranslations('Search');
  const { indexName } = Config.algoliaIndexes.find(
    (index) => index.locale === locale
  );
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
  );
  return (
    <div className="app-container">
      <Autocomplete
        openOnFocus={true}
        getSources={({ query }) => [
          {
            sourceId: 'posts',
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName,
                    query
                  }
                ]
              });
            },
            templates: {
              item({ item, components }) {
                return <PostItem hit={item} components={components} />;
              }
            }
          }
        ]}
      />
    </div>
  );
}

export default Search;
