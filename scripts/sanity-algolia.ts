import algoliasearch from 'algoliasearch';
import sanityClient, { SanityDocumentStub } from '@sanity/client';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import indexer from 'sanity-algolia';

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

const handler = (req: VercelRequest, res: VercelResponse) => {
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400);
    res.json({ message: 'Bad request' });
    return;
  }

  const algoliaIndex = algolia.initIndex('addict-ru');

  const sanityAlgolia = indexer(
    {
      post: {
        index: 'addict-ru',
        projection: `{
          "title": title.ru
          "slug": slug.current,
          "tags: tags[]->title,
          "body": pt::text(text.ru)
        }`
      }
    },
    (document: SanityDocumentStub) => {
      return {
        title: document.title,
        slug: document.slug,
        body: document.body,
        tags: document.tags
      };
    }
  );

  return sanityAlgolia
    .webhookSync(sanity, req.body)
    .then(() => res.status(200).send('ok'));
};

export default handler;
