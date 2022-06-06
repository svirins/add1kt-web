import { useRouter } from 'next/router';

import algoliasearch from 'algoliasearch/lite';
import { useTranslations } from 'next-intl';
import { Configure, InstantSearch, Hits } from 'react-instantsearch-hooks-web';

import { localizedAlgoliaIndices } from '@/lib/config';

import Autocomplete from '@/components/Autocomplete';
import Hit from '@/components/Hit';

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
  function customSearchHook(helper) {
    if (! helper.state || helper?.state?.query?.length < 2) {
      return;
    }
    helper.search();
  }

  return (
    <div>
      <InstantSearch
        searchClient={searchClient}
        indexName={indexName}
        routing={false}
        searchFunction={(helper) => customSearchHook(helper)}
      >
        <Autocomplete
          searchClient={searchClient}
          placeholder={t('inputPlaceholder')}
          detachedMediaQuery="none"
          openOnFocus
          className="autocomplete"
        />
        <Configure
          analytics={false}
          hitsPerPage={8}
          typoTolerance={true}
          attributesToSnippet={['title:7']}
        />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </div>
  );
}

export default Search;
