import { ALL_POST_DATA } from './queries';

const POST_GRAPHQL_FIELDS = `
slug
title
coverImage {
  url
}
date
author {
  name
  picture {
    url
  }
}
excerpt
content {
  json
  links {
    assets {
      block {
        sys {
          id
        }
        url
        description
      }
    }
  }
}
`;

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`
      },
      body: JSON.stringify({ query })
    }
  ).then((response) => response.json());
}

function extractPost(fetchResponse) {
  return fetchResponse?.data?.postCollection?.items?.[0];
}

function extractPostEntries(fetchResponse) {
  return fetchResponse?.data?.postCollection?.items;
}

export async function getPreviewPostBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  );
  return extractPost(entry);
}

export async function getAllPostsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  );
  return extractPostEntries(entries);
}

export async function getAllPostsForHome() {
  const entries = await fetchGraphQL(
    `query {
      postCollection(
        order: sys_publishedAt_DESC
        preview: false
        limit: 7
        locale: "ru"
        where: { featured: true }
      ) {
      items {
            ${ALL_POST_DATA}
          }
        }
      }`
  );
  return extractPostEntries(entries);
}

export async function getAllPostsForAlgolia() {
  const entries = await fetchGraphQL(
    `query {
      postCollection(
        order: sys_publishedAt_DESC
        preview: false
        locale: "ru"

      ) {
      items {
            ${ALL_POST_DATA}
          }
        }
      }`
  );
  return extractPostEntries(entries);
}

export async function getPostAndMorePosts(slug) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(
      where: { slug: "${slug}" }
      preview: false
      locale: "ru"
      limit: 1
      ) {
        items {
          ${ALL_POST_DATA}
        }
      }
    }`
  );
  // TODO: implement filtering by tags for 'more posts'
  const entries = await fetchGraphQL(
    `query {
      postCollection(
        where: { slug_not_in: "${slug}" }
        order: sys_publishedAt_DESC
        preview: false
        locale: "ru"
        limit: 2
        ) {
        items {
          ${ALL_POST_DATA}
        }
      }
    }`
  );
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries)
  };
}
