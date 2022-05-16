import { useRouter } from 'next/router';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-hooks';

import Config from '@/config/global-config';

import Autocomplete from '@/components/search/autocomplete';
import Hit from '@/components/search/hit';
import Hits from '@/components/search/hits';

function Search() {
  let { locale } = useRouter();
  const { indexName, querySuggestionsIndexName } = Config.algoliaIndexes.find(
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
        indexName={querySuggestionsIndexName}
        routing
      >
        <div className="container wrapper">
          <Autocomplete
            searchClient={searchClient}
            indexName={querySuggestionsIndexName}
            placeholder="Search products"
            detachedMediaQuery="none"
            openOnFocus
          />{' '}
          <Hits hitComponent={Hit} />
        </div>
      </InstantSearch>
    </div>
  );
}

export default Search;
