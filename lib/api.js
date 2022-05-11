import {
  ALL_POST_DATA,
  HOMEPAGE_DATA,
  ALL_POST_DATA_WITH_RELATED
} from '@/lib/queries';
import Config from '@/config/global-config';

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

function extractRelatedPosts(fetchResponse) {
  return fetchResponse?.data?.postCollection?.items[0]?.relatedPostsCollection?.items.map(
    ({ slug }) => slug
  );
}

export async function getPreviewPostBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${ALL_POST_DATA}
        }
      }
    }`,
    true
  );
  return extractPost(entry);
}

export async function getFeaturedPosts(locale) {
  const entries = await fetchGraphQL(
    `query {
      postCollection(
        order: sys_firstPublishedAt_DESC
        preview: false
        limit: ${Number(Config.pagination.featuredPostsSize)}
        locale: "${locale}"
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

export async function getAllSlugs() {
  const entries = await fetchGraphQL(
    `query {
      postCollection(
        preview: false
      ) {
        items {
          slug
        }
      }
    }`
  );
  return extractPostEntries(entries);
}

export async function getPostAndRelatedPosts(slug, locale) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(
      where: { slug: "${slug}" }
      preview: false
      locale: "${locale}"
      limit: 1
      ) {
        items {
          ${ALL_POST_DATA_WITH_RELATED}
        }
      }
    }`
  );
  const slugs = extractRelatedPosts(entry).join(',');

  // TODO: implement filtering by tags for 'more posts'
  const entries = await fetchGraphQL(
    `query {
      postCollection(
        where: { slug_in: [${slugs}] }
        order: sys_firstPublishedAt_DESC
        preview: false
        locale: "${locale}"
        limit: ${Number(Config.pagination.pageSize)}
        ) {
        items {
          ${ALL_POST_DATA}
        }
      }
    }`
  );
  console.log(entries);
  return {
    post: extractPost(entry),
    relatedPosts: extractPostEntries(entries)
  };
}

export async function getAllPostsForAlgolia() {
  const entries = await fetchGraphQL(
    `query {
      postCollection(
        order:  sys_firstPublishedAt_DESC
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

export async function getTotalPostsNumber() {
  const { data } = await fetchGraphQL(`query {
    postCollection(
      preview: false
    ) {
      total
      }
    }`);
  return data?.postCollection?.total;
}

export async function getPaginatedPosts(page, locale) {
  const skipMultiplier = page === 1 ? 0 : page - 1;
  const skip =
    skipMultiplier > 0 ? Config.pagination.pageSize * skipMultiplier : 0;
  const entries = await fetchGraphQL(
    `query {
      postCollection(
        order: sys_publishedAt_DESC
        preview: false
        locale: "${locale}"
        limit: ${Number(Config.pagination.pageSize)}
        skip: ${Number(skip)}
        ) {
        items {
          ${ALL_POST_DATA}
        }
      }
    }`
  );

  return extractPostEntries(entries);
}

export async function getHomepageContent(locale) {
  const { data } = await fetchGraphQL(
    `query {
      homepageCollection(
        preview: false
        locale: "${locale}"
        limit: 1
        ) {
        items {
          ${HOMEPAGE_DATA}
        }
      }
    }`
  );

  return data?.homepageCollection?.items[0];
}
