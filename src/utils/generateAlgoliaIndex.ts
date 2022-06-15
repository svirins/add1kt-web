/* eslint-disable no-console */
import sanityClient from "@sanity/client";
import algoliasearch from "algoliasearch";
// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from "dotenv";
import groq from "groq";

import { globalConfig, localizedAlgoliaIndices } from "./global.config";

type PostExtended = {
  objectID: string;
  updatedAt: string;
  title: string;
  slug: string;
  readingTime: number;
  image: string;
  author: string;
  tags: string[];
};

dotenv.config();
const getPostsIndexQuery = groq`*[_type == 'post'] {
  "objectID": _id,
  "updatedAt": _updatedAt,
  "title": title[$locale],
  "image":  coverImage.asset-> url,
  "readingTime": round(length(pt::text(text[$locale])) / 5 / 180 ),
  "slug": slug.current,
  "tags": tags[] -> title[$locale],
  "author": author -> title[$locale]
}[$skip...$limit] | order(_updatedAt desc)`;

const algoliaInstance = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.ALGOLIA_SEARCH_ADMIN_KEY
);

const client = sanityClient({
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2021-03-25",
  useCdn: false,
});

async function getPostsIndex(locale: string): Promise<PostExtended[]> {
  const data = await client.fetch(getPostsIndexQuery, {
    locale,
    skip: 0,
    limit: globalConfig.pagination.allPostsSize,
  });
  return data;
}

const generateIndexPerLocale = async (indexName: string, locale: string) => {
  const data = await getPostsIndex(locale);
  const mappedData = data.map((post) => {
    return {
      objectID: post.objectID,
      title: post.title,
      slug: post.slug,
      tags: post.tags,
    };
  });

  const index = algoliaInstance.initIndex(indexName);

  try {
    await index.saveObjects(mappedData);
    console.log(
      `Saving ${mappedData.length} documents to index:  ${indexName}`
    );
    return {
      status: 200,
      body: "Success!",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      body: error,
    };
  }
};

export default async function generateAlgoliaIndex() {
  // eslint-disable-next-line no-restricted-syntax
  for await (const i of localizedAlgoliaIndices) {
    generateIndexPerLocale(i.indexName, i.locale);
  }
}

generateAlgoliaIndex();
