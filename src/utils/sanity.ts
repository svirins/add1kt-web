import sanityClient from "@sanity/client";
import createImageUrlBuilder from "@sanity/image-url";

import { SANITY_CONFIG } from "./global.config";

export function getSanityClient({ useCdn = true }) {
  return sanityClient({ useCdn, ...SANITY_CONFIG });
}

const client = getSanityClient({ useCdn: true });

export const urlFor = (source: string) =>
  createImageUrlBuilder(client).image(source);
