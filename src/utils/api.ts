/* eslint-disable simple-import-sort/imports */
/* eslint-disable import/order */
import { getSanityClient } from './sanity';
import { getSkipValue } from './contentUtils';
import { globalConfig } from '@/config/global.config';
import type {
  Post,
  PostShort,
  Page,
  Tag,
  Author,
  PostsByAuthor,
  PostsByTag,
  Slug,
} from '@/typings/schema-types';

import {
  getFeaturedPostsQuery,
  getPageContentQuery,
  getAllPostSlugsQuery,
  getAllAuthorSlugsQuery,
  getAllTagSlugsQuery,
  getPostAndRelatedPostsQuery,
  getAuthorAndRelatedPostsQuery,
  getTagAndRelatedPostsQuery,
  getPaginatedPostsQuery,
  getTagsAndRelatedPostsCountQuery,
  getAuthorsAndRelatedPostsCountQuery,
  getTotalPostsNumberQuery,
  getTotalPostForAlgoliaQuery,
} from './queries';

const client = getSanityClient({ useCdn: false });

export async function getFeaturedPosts(locale: string): Promise<PostShort[]> {
  const data = await client.fetch(
    getFeaturedPostsQuery,
    {
      locale,
      skip: 0,
      limit: globalConfig.pagination.pageSize,
    },
  );
  return data;
}

export async function getPageContent(locale: string, slug: string): Promise<
Page
> {
  const data = await client.fetch(
    getPageContentQuery,
    {
      locale,
      slug,
    },
  );
  return data;
}

export async function getAuthorsAndRelatedPostsCount(locale: string): Promise<
PostsByAuthor[]
> {
  const data = await client.fetch(
    getAuthorsAndRelatedPostsCountQuery,
    {
      locale,
    },
  );
  return data;
}

export async function getTagsAndRelatedPostsCount(locale: string): Promise<
PostsByTag[]
> {
  const data = await client.fetch(
    getTagsAndRelatedPostsCountQuery,
    {
      locale,
    },
  );
  return data;
}

export async function getAllTagSlugs(): Promise<Slug[]> {
  const data = await client.fetch(getAllTagSlugsQuery);
  return data;
}

export async function getTagAndRelatedPosts(
  locale: string,
  slug: string,
): Promise<Tag> {
  const data = await client.fetch(
    getTagAndRelatedPostsQuery,
    {
      locale,
      slug,
      skip: 0,
      limit: globalConfig.pagination.allPostsSize,
    },
  );
  return data;
}

export async function getAllAuthorSlugs(): Promise<Slug[]> {
  const data = await client.fetch(getAllAuthorSlugsQuery);
  return data;
}

export async function getAuthorAndRelatedPosts(
  locale: string,
  slug: string,
): Promise<Author> {
  const data = await client.fetch(
    getAuthorAndRelatedPostsQuery,
    {
      locale,
      slug,
      skip: 0,
      limit: globalConfig.pagination.allPostsSize,
    },
  );
  return data;
}

export async function getAllPostSlugs(): Promise<Slug[]> {
  const data = await client.fetch(getAllPostSlugsQuery);
  return data;
}

export async function getPostAndRelatedPosts(
  locale: string,
  slug: string,
): Promise<Post> {
  const data = await client.fetch(
    getPostAndRelatedPostsQuery,
    {
      locale,
      slug,
      skip: 0,
      limit: globalConfig.pagination.morePostsSize,
    },
  );
  return data;
}

export async function getPaginatedPosts(locale: string, page: number): Promise<
PostShort[]
> {
  const data = await client.fetch(
    getPaginatedPostsQuery,
    {
      locale,
      skip: getSkipValue(page),
      limit: globalConfig.pagination.pageSize + getSkipValue(page),
    },
  );
  return data;
}

export async function getTotalPostsNumber(): Promise<number> {
  const totalPosts: number = await client.fetch(getTotalPostsNumberQuery);
  return Number(totalPosts);
}

export async function getPostsForAlgolia(locale: string): Promise<PostShort[]> {
  const data = await client.fetch(getTotalPostForAlgoliaQuery, { locale });
  return data;
}
