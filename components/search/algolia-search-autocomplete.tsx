import { useRouter } from 'next/router';
import algoliasearch from 'algoliasearch/lite';
import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
import { useTranslations } from 'next-intl';

import Config from '@/config/global-config';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

export default function AlgoliaSearch() {
  let { locale } = useRouter();
  const indexName = Config.algoliaIndexes.find(
    (index) => index.locale === locale
  ).indexName;
  const t = useTranslations('Search');

  const autocompleteSearch = autocomplete({
    // TODO: point container to div
    //
    container: '#autocomplete',
    translations: {
      clearButtonTitle: t('clearButtonTite'),
      detachedCancelButtonText: t('detachedCancelButtonText'),
      submitButtonTitle: t('submitButtonTitle')
    },
    classNames: {
      root: 'custom classes',
      input:
        'border-2 border-primary bg-red transition h-12 px-5 pr-16 rounded-md focus:outline-none w-full text-black text-lg'
    },
    getSources() {
      return [
        {
          sourceId: 'querySuggestions',
          getItemInputValue: ({ item }) => item.query,
          getItems({ query }) {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  indexName: indexName,
                  query,
                  params: {
                    hitsPerPage: 8
                  }
                }
              ]
            });
          },
          getItemUrl({ item }) {
            return `blog/${item.slug}`;
          },
          templates: {
            item({ item, components }) {
              return components.ReverseHighlight({
                hit: item,
                attribute: 'query'
              });
            }
          }
        }
      ];
    }
  });

  return autocompleteSearch();
}
