import createImageUrlBuilder from '@sanity/image-url';
import sanityClient from '@sanity/client';

import { sanityConfig } from '@/config/global.config';

function getSanityClient({ useCdn = true }) {
  return sanityClient({ useCdn, ...sanityConfig });
}

const client = getSanityClient({ useCdn: true });

export const imageBuilder = (source) =>
  createImageUrlBuilder(client).image(source);
export const urlFor = (source) => createImageUrlBuilder(client).image(source);

export default getSanityClient;
