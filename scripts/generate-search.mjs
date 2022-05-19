// eslint-disable-next-line no-unused-vars
import dotenv from 'dotenv';
import algoliasearch from 'algoliasearch';
import { gql, request } from 'graphql-request';

import Config from '../config/global-config.js';

dotenv.config();
const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

const headers = {
  authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`
};

async function apiRequest(query, variables) {
  try {
    const data = await request({
      url: endpoint,
      document: query,
      variables: variables,
      requestHeaders: headers
    });
    return data;
  } catch (error) {
    console.error(JSON.stringify(error));
    return error;
  }
}
export default apiRequest;

async function GetDataForAlgolia(locale) {
  const query = gql`
    query GetPaginatedPosts($locale: String!) {
      postCollection(order: sys_firstPublishedAt_DESC, locale: $locale) {
        items {
          title
          slug
          tagsCollection {
            items {
              title
            }
          }
          sys {
            id
            firstPublishedAt
          }
        }
      }
    }
  `;
  const variables = {
    locale
  };
  const data = await apiRequest(query, variables);
  return data?.postCollection?.items ?? null;
}

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
    const posts = await GetDataForAlgolia(locale);
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
