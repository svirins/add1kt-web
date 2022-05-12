import { gql } from 'graphql-request';
import apiRequest from '@/lib/fetcher';
import Config from '@/config/global-config';
import { POST_DATA, HOMEPAGE_DATA } from '@/lib/gql-fragments';

export async function getFeaturedPosts(locale) {
  const query = gql`
    ${POST_DATA}
    query GetFeaturedPosts($locale: String!, $limit: Int!) {
      postCollection(
        order: sys_firstPublishedAt_DESC
        limit: $limit
        locale: $locale
        where: { featured: true }
      ) {
        items {
          ...PostData
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

export async function getPostAndRelatedPosts(slug, locale) {
  const queryA = gql`
    ${POST_DATA}
    query GetPostBySlug($locale: String!, $slug: String!) {
      postCollection(limit: 1, locale: $locale, where: { slug: $slug }) {
        items {
          ...PostData
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
    ${POST_DATA}
    query GetPostBySlug($locale: String!, $slugs: [String]!, $limit: Int!) {
      postCollection(
        limit: $limit
        locale: $locale
        where: { slug_in: $slugs }
      ) {
        items {
          ...PostData
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
    ${POST_DATA}
    query GetPaginatedPosts($locale: String!, $limit: Int!, $skip: Int!) {
      postCollection(
        order: sys_firstPublishedAt_DESC
        limit: $limit
        locale: $locale
        skip: $skip
      ) {
        items {
          ...PostData
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
