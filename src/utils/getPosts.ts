/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import sanityClient from "@sanity/client";
import dotenv from "dotenv";
import groq from "groq";

import { globalConfig } from "./global.config";

type TPostData = {
  objectID: string;
  publishedAt: string;
  title: string;
  slug: string;
  summary: string;
  image: string;
  author: string;
  tags: string[];
};

dotenv.config();
const getPostsIndexQuery = groq`*[_type == 'post'] {
  "objectID": _id,
  "publishedAt": _updatedAt,
  "title": title[$locale],
  "image":  coverImage.asset-> url,
  "summary": pt::text(text[$locale]),
  "slug": slug.current,
  "tags": tags[] -> title[$locale],
  "author": author -> title[$locale]
}[$skip...$limit] | order(_updatedAt desc)`;

const client = sanityClient({
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2021-03-25",
  useCdn: false,
});

export async function getPosts(locale: string): Promise<TPostData[]> {
  const data = await client.fetch(getPostsIndexQuery, {
    locale,
    skip: 0,
    limit: globalConfig.pagination.allPostsSize,
  });
  return data;
}
