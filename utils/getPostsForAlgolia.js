import { createClient } from 'next-sanity';

const sanityConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2021-03-25',
  useCdn: false
};

const client = createClient(sanityConfig);

export async function getPostsForAlgolia(locale) {
  const data = await client.fetch(getTotalPostForAlgoliaQuery, {
    locale
  });
  return data;
}
