import '@algolia/autocomplete-theme-classic';
import 'instantsearch.css/themes/satellite.css';

import { getAlgoliaResults } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';

import { localizedAlgoliaIndices } from '@/config/global.config';

import { Autocomplete } from './Autocomplete';
import { SearchItem } from './SearchItem';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

export function Search() {
  const { locale } = useRouter();
  const t = useTranslations('Search');
  const { indexName } = localizedAlgoliaIndices.find(
    (index) => index.locale === locale
  );
  return (
    <div>
      <Autocomplete
        openOnFocus={false}
        detachedMediaQuery=""
        placeholder={t('inputPlaceholder')}
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
                    indexName,
                    query,
                  },
                ],
              });
            },
            templates: {
              item({ item, components }) {
                return <SearchItem hit={item} components={components} />;
              },
            },
          },
        ]}
      />
    </div>
  );
}
