import { gql } from 'graphql-request';
import apiRequest from '@/lib/fetcher';
import Config from '@/config/global-config';
import {
  FULL_POST_DATA,
  SHORT_POST_DATA,
  HOMEPAGE_DATA,
  AUTHOR_DATA,
  TAG_DATA
} from '@/lib/gql-fragments';

export async function getFeaturedPosts(locale) {
  const query = gql`
    ${SHORT_POST_DATA}
    query GetFeaturedPosts($locale: String!, $limit: Int!) {
      postCollection(
        order: sys_firstPublishedAt_DESC
        limit: $limit
        locale: $locale
        where: { featured: true }
      ) {
        items {
          ...ShortPostData
        }
      }
    }
  `;
  const variables = {
    locale: locale,
    limit: Config.pagination.featuredPostsSize
  };

  const data = await apiRequest(query, variables);
  return data?.postCollection?.items ?? null;
}

export async function getHomepageContent(locale) {
  const query = gql`
    ${HOMEPAGE_DATA}
    query GetHomepageData($locale: String!) {
      homepageCollection(locale: $locale) {
        items {
          ...HomepageData
        }
      }
    }
  `;
  const variables = {
    locale: locale
  };

  const data = await apiRequest(query, variables);
  return data?.homepageCollection?.items[0] ?? null;
}

export async function getAllSlugs() {
  const query = gql`
    query {
      postCollection {
        items {
          slug
        }
      }
    }
  `;
  const variables = {};
  const data = await apiRequest(query, variables);
  return data?.postCollection?.items ?? null;
}

export async function getAllAuthors() {
  const query = gql`
    query {
      authorCollection {
        items {
          slug
          sys {
            id
          }
        }
      }
    }
  `;
  const variables = {};
  const data = await apiRequest(query, variables);
  return data?.authorCollection?.items ?? null;
}

export async function getAllTags() {
  const query = gql`
    query {
      tagCollection {
        items {
          slug
        }
      }
    }
  `;
  const variables = {};
  const data = await apiRequest(query, variables);
  return data?.authorCollection?.items ?? null;
}

export async function getPostAndRelatedPosts(slug, locale) {
  const queryA = gql`
    ${FULL_POST_DATA}
    query GetPostBySlug($locale: String!, $slug: String!) {
      postCollection(limit: 1, locale: $locale, where: { slug: $slug }) {
        items {
          ...FullPostData
        }
      }
    }
  `;

  const variablesA = {
    locale: locale,
    slug: slug
  };

  const dataA = await apiRequest(queryA, variablesA);
  const slugs =
    dataA?.postCollection?.items[0]?.relatedPostsCollection.items.map(
      ({ slug }) => slug
    );
  const queryB = gql`
    ${SHORT_POST_DATA}
    query GetPostBySlug($locale: String!, $slugs: [String]!, $limit: Int!) {
      postCollection(
        limit: $limit
        locale: $locale
        where: { slug_in: $slugs }
      ) {
        items {
          ...ShortPostData
        }
      }
    }
  `;

  const variablesB = {
    locale: locale,
    slugs: slugs,
    limit: Config.pagination.morePostsSize
  };
  const dataB = await apiRequest(queryB, variablesB);

  return {
    post: dataA?.postCollection?.items[0] ?? null,
    relatedPosts: dataB?.postCollection?.items ?? null
  };
}
export async function getAuthorIdBySlug(slug, locale) {
  const query = gql`
    query GetAuthorId($slug: String!, $locale: String!) {
      authorCollection(where: { slug: $slug }, locale: $locale) {
        items {
          sys {
            id
          }
        }
      }
    }
  `;
  const variables = {
    slug: slug,
    locale: locale
  };
  const data = await apiRequest(query, variables);
  return data.authorCollection?.items[0]?.sys.id ?? null;
}

export async function getAuthorAndRelatedPosts(id, locale) {
  const query = gql`
    ${AUTHOR_DATA}
    ${SHORT_POST_DATA}
    query GetAuthorData(
      $locale: String!
      $id: String!
      $limit: Int!
      $skip: Int!
    ) {
      author(locale: $locale, id: $id) {
        ...AuthorData
        linkedFrom {
          postCollection(limit: $limit, skip: $skip, locale: $locale) {
            items {
              ...ShortPostData
            }
          }
        }
      }
    }
  `;
  const variables = {
    locale: locale,
    id: id,
    limit: Config.pagination.morePostsSize,
    skip: 0
  };
  const data = await apiRequest(query, variables);
  return {
    author: data?.author ?? null,
    relatedPosts: data?.author?.linkedFrom?.postCollection?.items ?? null
  };
}
export async function getTagIdBySlug(slug, locale) {
  const query = gql`
    query GetTagId($slug: String!, $locale: String!) {
      tagCollection(where: { slug: $slug }, locale: $locale) {
        items {
          sys {
            id
          }
        }
      }
    }
  `;
  const variables = {
    slug: slug,
    locale: locale
  };
  const data = await apiRequest(query, variables);
  return data.tagCollection?.items[0]?.sys.id ?? null;
}

export async function getTagAndRelatedPosts(id, locale) {
  const query = gql`
    ${TAG_DATA}
    ${SHORT_POST_DATA}
    query GetTagData(
      $locale: String!
      $id: String!
      $limit: Int!
      $skip: Int!
    ) {
      tag(locale: $locale, id: $id) {
        ...TagData
        linkedFrom {
          postCollection(limit: $limit, skip: $skip, locale: $locale) {
            items {
              ...BasicPostData
            }
          }
        }
      }
    }
  `;
  const variables = {
    locale: locale,
    id: id,
    limit: Config.pagination.morePostsSize,
    skip: 0
  };
  const data = await apiRequest(query, variables);
  return {
    tag: data?.tagCollection?.items[0] ?? null,
    relatedPosts: data?.postCollection?.items ?? null
  };
}

export async function getAllPostsForAlgolia() {
  return [];
}

export async function getTotalPostsNumber() {
  const query = gql`
    query {
      postCollection {
        total
      }
    }
  `;
  const variables = {};
  const data = await apiRequest(query, variables);
  return data?.postCollection?.total ?? 0;
}

export async function getPaginatedPosts(page, locale) {
  const skipMultiplier = page === 1 ? 0 : page - 1;
  const skip =
    skipMultiplier > 0 ? Config.pagination.pageSize * skipMultiplier : 0;

  const query = gql`
    ${SHORT_POST_DATA}
    query GetPaginatedPosts($locale: String!, $limit: Int!, $skip: Int!) {
      postCollection(
        order: sys_firstPublishedAt_DESC
        limit: $limit
        locale: $locale
        skip: $skip
      ) {
        items {
          ...ShortPostData
        }
      }
    }
  `;
  const variables = {
    locale: locale,
    limit: Config.pagination.morePostsSize,
    skip: skip
  };
  const data = await apiRequest(query, variables);
  return data?.postCollection?.items ?? null;
}
