import { globalConfig } from '@/config/global.config';

import { getSkipValue } from './contentUtils';
import {
  getAllAuthorSlugsQuery,
  getAllPostSlugsQuery,
  getAllTagSlugsQuery,
  getAuthorAndRelatedPostsQuery,
  getAuthorsAndRelatedPostsCountQuery,
  getFeaturedPostsQuery,
  getPageContentQuery,
  getPaginatedPostsQuery,
  getPostAndRelatedPostsQuery,
  getTagAndRelatedPostsQuery,
  getTagsAndRelatedPostsCountQuery,
  getTotalPostForAlgoliaQuery,
  getTotalPostsNumberQuery,
} from './queries';
import { getSanityClient } from './sanity';

const client = getSanityClient({ useCdn: false });

export async function getFeaturedPosts(locale) {
  const data = await client.fetch(getFeaturedPostsQuery, {
    locale,
    skip: 0,
    limit: globalConfig.pagination.pageSize,
  });
  return data;
}

export async function getPageContent(locale, slug) {
  const data = await client.fetch(getPageContentQuery, {
    locale,
    slug,
  });
  return data;
}

export async function getAuthorsAndRelatedPostsCount(locale) {
  const data = await client.fetch(getAuthorsAndRelatedPostsCountQuery, {
    locale,
  });
  return data;
}

export async function getTagsAndRelatedPostsCount(locale) {
  const data = await client.fetch(getTagsAndRelatedPostsCountQuery, {
    locale,
  });
  return data;
}

export async function getAllTagSlugs() {
  const data = await client.fetch(getAllTagSlugsQuery);
  return data;
}

export async function getTagAndRelatedPosts(locale, slug) {
  const data = await client.fetch(getTagAndRelatedPostsQuery, {
    locale,
    slug,
    skip: 0,
    limit: globalConfig.pagination.allPostsSize,
  });
  return data;
}

export async function getAllAuthorSlugs() {
  const data = await client.fetch(getAllAuthorSlugsQuery);
  return data;
}

export async function getAuthorAndRelatedPosts(locale, slug) {
  const data = await client.fetch(getAuthorAndRelatedPostsQuery, {
    locale,
    slug,
    skip: 0,
    limit: globalConfig.pagination.allPostsSize,
  });
  return data;
}

export async function getAllPostSlugs() {
  const data = await client.fetch(getAllPostSlugsQuery);
  return data;
}

export async function getPostAndRelatedPosts(locale, slug) {
  const data = await client.fetch(getPostAndRelatedPostsQuery, {
    locale,
    slug,
    skip: 0,
    limit: globalConfig.pagination.morePostsSize,
  });
  return data;
}

export async function getPaginatedPosts(locale, page) {
  const data = await client.fetch(getPaginatedPostsQuery, {
    locale,
    skip: getSkipValue(page),
    limit: globalConfig.pagination.pageSize + getSkipValue(page),
  });
  return data;
}

export async function getTotalPostsNumber() {
  const totalPosts: number = await client.fetch(getTotalPostsNumberQuery);
  return Number(totalPosts);
}

export async function getPostsForAlgolia(locale) {
  const data = await client.fetch(getTotalPostForAlgoliaQuery, { locale });
  return data;
}
