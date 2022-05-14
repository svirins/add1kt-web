import { useRouter } from 'next/router';
import algoliasearch from 'algoliasearch/lite';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
import { useTranslations } from 'next-intl';

import Config from '@/config/global-config';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);
// TODO: check for creating only one instance of algolia Client
export default function AlgoliaSearch() {
  let { locale } = useRouter();
  const { indexName, querySuggestionsIndexName } = Config.algoliaIndexes.find(
    (index) => index.locale === locale
  );

  const t = useTranslations('Search');
  const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
    key: 'RECENT_SEARCH',
    limit: 5
  });
  const querySuggestionsPlugin = createQuerySuggestionsPlugin({
    searchClient,
    indexName: querySuggestionsIndexName
  });

  autocomplete({
    classNames: {
      root: 'custom classes',
      input:
        'border-2 border-primary bg-red transition h-12 px-5 pr-16 rounded-md focus:outline-none w-full text-black text-lg'
    },
    container: '#autocomplete',
    openOnFocus: true,
    plugins: [recentSearchesPlugin, querySuggestionsPlugin],
    translations: {
      clearButtonTitle: t('clearButtonTitle'),
      detachedCancelButtonText: t('detachedCancelButtonText'),
      submitButtonTitle: t('submitButtonTitle')
    },
    getSources() {
      return [
        {
          sourceId: 'querySuggestions',
          getItems({ query }) {
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
          getItemUrl({ item }) {
            return `/blog/${item.slug}`;
          },
          getItemInputValue({ item }) {
            return item.value;
          },
          templates: {
            item({ item }) {
              return item.name;
            }
          }
        }
      ];
    }
  });
  return <div id="autocomplete" />;
}
