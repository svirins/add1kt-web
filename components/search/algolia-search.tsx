// className="border-2 border-primary bg-red transition h-12 px-5 pr-16 rounded-md focus:outline-none w-full text-black text-lg "

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-hooks-web';

const searchClient = algoliasearch(
  process.env.ALGOLIA_SEARCH_ADMIN_KEY,
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
);

export default function AlgoliaSearch() {
  return (
    <InstantSearch searchClient={searchClient} indexName="instant_search">
      <div className="flex relative mx-auto mb-4">
        <SearchBox />
        <Hits hitComponent={Hit} />
      </div>
    </InstantSearch>
  );
}

function Hit({ hit }) {
  return (
    <article>
      <h1>{hit.title}</h1>
    </article>
  );
}
