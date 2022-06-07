import createImageUrlBuilder from '@sanity/image-url';
import sanityClient from '@sanity/client';

import { sanityConfig } from '@/config/global.config';

const client = sanityClient(sanityConfig);

export const imageBuilder = (source) => createImageUrlBuilder(client).image(source);
export const urlFor = (source) => createImageUrlBuilder(client).image(source);

export default client;
