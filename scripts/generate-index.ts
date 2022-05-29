import indexer from 'sanity-algolia';
import sanityClient, { SanityDocumentStub } from '@sanity/client';

import { sanity } from './sanity-algolia';

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
// Fetch the _id of all the documents we want to index
const types = ['post'];
const query = `* [_type in $types && !(_id in path("drafts.**"))][]._id`;

sanity
  .fetch(query, { types })
  .then((ids) =>
    sanityAlgolia.webhookSync(client, {
      ids: { created: ids, updated: [], deleted: [] }
    })
  );
