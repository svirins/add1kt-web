import algoliasearch from 'algoliasearch';
import sanityClient from '@sanity/client';
import indexer, { flattenBlocks } from 'sanity-algolia';
import { logger, formatObjectKeys } from '@/lib/logger';

// TODO: im[plement 2 language search

const algolia = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.ALGOLIA_SEARCH_ADMIN_KEY
);

export const sanity = sanityClient({
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2021-03-25',
  useCdn: false
});

export default function handler(req, res)  {
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400);
    res.json({ message: 'Bad request' });
    return;
  }
  const sanityAlgolia = indexer(
    {
      post: {
        index: algolia.initIndex('addict-ru'),
      },
    },
    document => {
      switch (document._type) {
        case 'post':
          return {
            title: document.title,
            slug: document.slug.current,
            tags: document.tags,
          };
        default:
          throw new Error(`Unknown type: ${document.type}`);
      }
    }
  );

  try {
  const apiResponse = sanityAlgolia
  .webhookSync(sanity, req.body)
  .then(() => res.status(200).send('ok'));
  }
  catch (error) {
    logger.error(
      {
        request: {
          headers: formatObjectKeys(req.headers),
          url: req.url,
          method: req.method
        },
        response: {
          statusCode: res.statusCode
        }
      },
      error.message
    );
  }
  return apiResponse;
}
