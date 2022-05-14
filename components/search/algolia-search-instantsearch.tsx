// className="border-2 border-primary bg-red transition h-12 px-5 pr-16 rounded-md focus:outline-none w-full text-black text-lg "

import { useRouter } from 'next/router';
import algoliasearch from 'algoliasearch/lite';
import { useTranslations } from 'next-intl';

import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Configure
} from 'react-instantsearch-hooks-web';

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

  return (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <div className="flex relative mx-auto mb-4">
        <Configure
          hitsPerPage={10}
          analytics={false}
          typoTolerance={true}
          attributesToHighlight={['tag', 'title']}
        />

        <SearchBox
          placeholder={t('placeholder')}
          classNames={{
            root: 'MyCustomSearchBox',
            form: 'MyCustomSearchBoxForm MyCustomSearchBoxForm--subclass'
          }}
        />
        <Hits
          hitComponent={Hit}
          classNames={{
            root: 'MyCustomHits',
            emptyRoot: '',
            list: 'MyCustomHitsList MyCustomHitsList--subclass',
            item: ''
          }}
        />
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

// objectID: post.sys.id,
// title: post.title,
// slug: post.slug,
// featured: post.featured,
// tagCollection: {
//   items: post.tagsCollection.items.map((tag) => tag.title)
// },
// date: post.sys.firstPublishedAt
