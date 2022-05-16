// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const algoliasearch = require('algoliasearch/lite');
const { gql, request } = require('graphql-request');
const Config = require('../config/global-config');

async function apiRequest(query, variables) {
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;
  const headers = {
    authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`
  };
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

async function getAllPostsForAlgolia(locale) {
  const query = gql`
    query GetAlgoliaPosts($locale: String!) {
      postCollection(order: sys_firstPublishedAt_DESC, locale: $locale) {
        items {
          slug
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
    locale: locale
  };
  const data = await apiRequest(query, variables);
  return data?.postCollection?.items ?? [];
}

function transformPostsToSearchObjects(posts) {
  const transformed = posts.map((post) => {
    return {
      objectID: post.sys.id,
      title: post.title,
      slug: post.slug,
      tagCollection: {
        tags: post.tagsCollection.items.map((tag) => tag.title)
      },
      date: post.sys.firstPublishedAt
    };
  });
  return transformed;
}

async function createIndex(indexName, locale) {
  try {
    const posts = await getAllPostsForAlgolia(locale);
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
  dotenv.config();
  for await (const i of Config.algoliaIndexes) {
    createIndex(i.indexName, i.locale);
    createIndex(i.querySuggestionsIndexName, i.locale);
  }
}

generate();
