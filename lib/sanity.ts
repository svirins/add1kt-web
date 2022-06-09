import sanityClient from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';

import { sanityConfig } from '@/config/global.config';

export function getSanityClient({ useCdn = true }) {
  return sanityClient({ useCdn, ...sanityConfig });
}

const client = getSanityClient({ useCdn: true });

export const urlFor = (source) => createImageUrlBuilder(client).image(source);
