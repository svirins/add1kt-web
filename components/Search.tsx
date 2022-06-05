import { useRouter } from 'next/router';

import algoliasearch from 'algoliasearch/lite';
import { useTranslations } from 'next-intl';
import { Configure, InstantSearch, Hits } from 'react-instantsearch-hooks-web';

import { localizedAlgoliaIndices } from '@/lib/config';

import Autocomplete from '@/components/Autocomplete';
import Hit from '@/components/Hit'

function Search() {
  const { locale } = useRouter();
  const t = useTranslations('Search');
  const { indexName } = localizedAlgoliaIndices.find(
    (index) => index.locale === locale
  );
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
  );
  return (
    <div>
      <InstantSearch
        searchClient={searchClient}
        indexName={indexName}
        routing={false}
      >
        <Autocomplete
          searchClient={searchClient}
          placeholder={t('inputPlaceholder')}
          detachedMediaQuery="none"
          openOnFocus
          className="block w-full text-gray-800 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
        />
        <Configure
          analytics={false}
          hitsPerPage={8}
          typoTolerance={true}
          attributesToSnippet={['title:7']}
          snippetEllipsisText="…"
        />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </div>
  );
}

export default Search;
