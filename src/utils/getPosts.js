/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import sanityClient from "@sanity/client";
import dotenv from "dotenv";
import groq from "groq";

import { GLOBAL_CONFIG } from "./global.config";

dotenv.config();
const getPostsIndexQuery = groq`*[_type == 'post'] {
  "objectID": _id,
  "publishedAt": _updatedAt,
  "title": title[$locale],
  "image":  coverImage.asset-> url,
  "text": pt::text(text[$locale]),
  "slug": slug.current,
  "tags": tags[] -> title[$locale],
  "author": author -> {
    "name": title[$locale],
    "email": email,
    "link": twitter
    }
}[$skip...$limit] | order(_updatedAt desc)`;

const client = sanityClient({
  dataset: "development",
  projectId: "ro6en9ct",
  apiVersion: "2021-03-25",
  useCdn: false,
});

// eslint-disable-next-line import/prefer-default-export
export async function getPosts(locale) {
  const data = await client.fetch(getPostsIndexQuery, {
    locale,
    skip: 0,
    limit: GLOBAL_CONFIG.pagination.allPostsSize,
  });
  return data;
}
