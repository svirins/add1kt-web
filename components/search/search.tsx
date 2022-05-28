import { useRouter } from 'next/router';

import algoliasearch from 'algoliasearch/lite';
import { useTranslations } from 'next-intl';
import { Configure, InstantSearch } from 'react-instantsearch-hooks';


import Autocomplete from '@/components/search/autocomplete';
import Hit from '@/components/search/hit';
import Hits from '@/components/search/hits';

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
  console.log;
  return (
    <div>
      <InstantSearch searchClient={searchClient} indexName={indexName} routing>
        <div className="container wrapper">
          <Autocomplete
            searchClient={searchClient}
            indexName={indexName}
            placeholder={t('inputPlaceholder')}
            detachedMediaQuery="none"
            // openOnFocus
            // classNames={{item:''}}
            className="block w-full text-gray-800 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
          <Configure analytics={false} hitsPerPage={8} typoTolerance={true} />
          <Hits hitComponent={Hit} />
        </div>
      </InstantSearch>
    </div>
  );
}

export default Search;
