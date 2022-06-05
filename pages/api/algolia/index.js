import algoliasearch from 'algoliasearch';
import { createClient } from 'next-sanity';
import { groq } from 'next-sanity';
import indexer from 'sanity-algolia';

import { localizedAlgoliaIndices } from '@/lib/config';

const sanityConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2021-03-25',
  useCdn: false
};

const sanity = createClient(sanityConfig);

const algolia = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.ALGOLIA_SEARCH_ADMIN_KEY
);

const getTotalPostForAlgoliaQuery = groq`*[_type == 'post'] {
  "objectID": _id,
  "title": title[$locale],
  "slug": slug.current,
  "tags": tags[] -> title[$locale]
}`;

function localizedIndexer(indexName, locale) {
  const algoliaIndex = algolia.initIndex(indexName);
  const sanityAlgolia = indexer(
    {
      post: {
        index: algoliaIndex,
        projection: `{
          "objectID": _id,
          "title": title[$locale],
          "slug": slug.current,
          "tags": tags[] -> title[$locale]
        }`
      }
    },
    (document) => document
    // switch (document._type) {
    //   case 'post':
    //     return {
    //       title: document.heading,
    //       slug: document.slug,
    //       tags: document.tags
    //     };
    //   default:
    //     return document;
    // }
  );
  return sanityAlgolia;
}

function handler(re, res) {
  // Tip: Its good practice to include a shared secret in your webhook URLs and
  // validate it before proceeding with webhook handling. Omitted in this short
  // example.
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400);
    res.json({ message: 'Bad request' });
    return;
  }

  for (const i of localizedAlgoliaIndices) {
    let sanityAlgolia = localizedIndexer(i.indexName, i.locale);
    sanityAlgolia
      .webhookSync(sanity, req.body)
      .then(() => res.status(200).send('ok'));
  }
}

// const generateIndexPerLocale = async (indexName, locale) => {
//   const data = await client.fetch(getTotalPostForAlgoliaQuery, { locale });
//   const index = algoliaInstance.initIndex(indexName);

//   try {
//     await index.saveObjects(data);
//     console.log(`Saving ${data.length} documents to index:  ${indexName}`);
//     return {
//       status: 200,
//       body: 'Success!'
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       status: 500,
//       body: error
//     };
//   }
// };

// export default async function generateAlgoliaIndex() {
//   for await (const i of localizedAlgoliaIndices) {
//     generateIndexPerLocale(i.indexName, i.locale);
//   }
// }
