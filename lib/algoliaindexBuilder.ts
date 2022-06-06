import algoliasearch from 'algoliasearch';
import { createClient, groq } from 'next-sanity';

import { localizedAlgoliaIndices } from '@/config/global.config';

const sanityConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2021-03-25',
  useCdn: false
};

const client = createClient(sanityConfig);

const algoliaInstance = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.ALGOLIA_SEARCH_ADMIN_KEY
);

const getTotalPostForAlgoliaQuery = groq`*[_type == 'post'] {
  "objectID": _id,
  "title": title[$locale],
  "slug": slug.current,
  "tags": tags[] -> title[$locale]
}`;

const generateIndexPerLocale = async (indexName, locale) => {
  const data = await client.fetch(getTotalPostForAlgoliaQuery, { locale });
  const index = algoliaInstance.initIndex(indexName);

  try {
    await index.saveObjects(data);
    console.log(`Saving ${data.length} documents to index:  ${indexName}`);
    return {
      status: 200,
      body: 'Success!'
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      body: error
    };
  }
};

export default async function generateAlgoliaIndex() {
  for await (const i of localizedAlgoliaIndices) {
    generateIndexPerLocale(i.indexName, i.locale);
  }
}
