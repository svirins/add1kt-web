// eslint-disable-next-line no-unused-vars
import dotenv from 'dotenv';
import algoliasearch from 'algoliasearch';
import { gql, request } from 'graphql-request';

import Config from '../config/global-config.js';


function transformPostsToSearchObjects(posts) {
  const transformed = posts.map((post) => {
    return {
      objectID: post.sys.id,
      name: post.title,
      slug: post.slug,
      tags: {
        tags: post.tagsCollection.items.map((tag) => tag.title)
      },
      date: post.sys.firstPublishedAt
    };
  });
  return transformed;
}

async function createIndex(indexName, locale) {
  try {
    const posts = [];
    const transformed = transformPostsToSearchObjects(posts);
    const client = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
      process.env.ALGOLIA_SEARCH_ADMIN_KEY
    );
    const index = client.initIndex(indexName);
    const algoliaResponse = await index.saveObjects(transformed);
    console.log(
      `🎉 Sucessfully created index for ${locale} locale ${
        algoliaResponse.objectIDs.length
      } records to Algolia search. Object IDs:\n${algoliaResponse.objectIDs.join(
        '\n'
      )}`
    );
  } catch (error) {
    console.log(error);
  }
}

async function generate() {
  for await (const i of Config.algoliaIndexes) {
    createIndex(i.indexName, i.locale);
  }
}

generate();
