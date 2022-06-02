import algoliasearch from 'algoliasearch';
import sanityClient from '@sanity/client';
import indexer from 'sanity-algolia';
import { logger, formatObjectKeys } from './_logger';

// TODO: im[plement 2 language search

const algolia = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.ALGOLIA_SEARCH_ADMIN_KEY
);


const sanity = sanityClient({
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'development',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2021-03-25',
  useCdn: false
});

export default function handler(request, response) {
  if (request.headers['content-type'] !== 'application/json') {
    response.status(400);
    response.json({ message: 'Bad request' });
    return;
  }
  const projection = `"objectID": _id,
                      "title": title.ru,
                      "slug": slug.current,
                      "tags": tags[] -> title.ru`;

  const indexName = 'addict-ru';
  const sanityAlgolia = indexer(
    {
      post: {
        index: algolia.initIndex(indexName),
      }
    },
    (document) => {
      switch (document._type) {
        case 'post':
          return {
            title: document.title,
            slug: document.slug.current,
          }
        default:
          throw new Error('You didnt handle a type you declared interest in')
      }
    }
  )

  return (
    sanityAlgolia
      .webhookSync(sanity, request.bodyy)
      // .then(() => response.status(200).send('ok'))
      .then(() => res.status(200).send('ok'))
      .catch((error) => {
        logger.error(
          {
            request: {
              headers: formatObjectKeys(request.headers),
              url: request.url,
              method: request.method
            },
            response: {
              statusCode: request.statusCode
            }
          },
          error.message
        );
      })
  );
}
