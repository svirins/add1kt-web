/* eslint-disable simple-import-sort/imports */
/* eslint-disable import/order */
import type {
  TAuthor,
  TPage,
  TPost,
  TPostBase,
  TPostsByAuthor,
  TPostsByTag,
  TSlug,
  TTag,
} from "@/typings/schema-types";
import { globalConfig } from "./global.config";
import { getSkipValue } from "./contentUtils";
import { getSanityClient } from "./sanity";

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
  getTotalPostsNumberQuery,
} from "./queries";

const client = getSanityClient({ useCdn: false });

export async function getFeaturedPosts(locale: string): Promise<TPostBase[]> {
  const data = await client.fetch(getFeaturedPostsQuery, {
    locale,
    skip: 0,
    limit: globalConfig.pagination.pageSize,
  });
  return data;
}

export async function getPageContent(
  locale: string,
  slug: string
): Promise<TPage> {
  const data = await client.fetch(getPageContentQuery, {
    locale,
    slug,
  });
  return data;
}

export async function getAuthorsAndRelatedPostsCount(
  locale: string
): Promise<TPostsByAuthor[]> {
  const data = await client.fetch(getAuthorsAndRelatedPostsCountQuery, {
    locale,
  });
  return data;
}

export async function getTagsAndRelatedPostsCount(
  locale: string
): Promise<TPostsByTag[]> {
  const data = await client.fetch(getTagsAndRelatedPostsCountQuery, {
    locale,
  });
  return data;
}

export async function getAllTagSlugs(): Promise<TSlug[]> {
  const data = await client.fetch(getAllTagSlugsQuery);
  return data;
}

export async function getTagAndRelatedPosts(
  locale: string,
  slug: string
): Promise<TTag> {
  const data = await client.fetch(getTagAndRelatedPostsQuery, {
    locale,
    slug,
    skip: 0,
    limit: globalConfig.pagination.allPostsSize,
  });
  return data;
}

export async function getAllAuthorSlugs(): Promise<TSlug[]> {
  const data = await client.fetch(getAllAuthorSlugsQuery);
  return data;
}

export async function getAuthorAndRelatedPosts(
  locale: string,
  slug: string
): Promise<TAuthor> {
  const data = await client.fetch(getAuthorAndRelatedPostsQuery, {
    locale,
    slug,
    skip: 0,
    limit: globalConfig.pagination.allPostsSize,
  });
  return data;
}

export async function getAllPostSlugs(): Promise<TSlug[]> {
  const data = await client.fetch(getAllPostSlugsQuery);
  return data;
}

export async function getPostAndRelatedPosts(
  locale: string,
  slug: string
): Promise<TPost> {
  const data = await client.fetch(getPostAndRelatedPostsQuery, {
    locale,
    slug,
    skip: 0,
    limit: globalConfig.pagination.morePostsSize,
  });
  return data;
}

export async function getPaginatedPosts(
  locale: string,
  page: number
): Promise<TPostBase[]> {
  const data = await client.fetch(getPaginatedPostsQuery, {
    locale,
    skip: getSkipValue(page),
    limit: globalConfig.pagination.pageSize + getSkipValue(page),
  });
  return data;
}

export async function getTotalPostsNumber(): Promise<number> {
  const totalPosts: number = await client.fetch(getTotalPostsNumberQuery);
  return Number(totalPosts);
}
