import {
  createClient,
  createPreviewSubscriptionHook,
  createCurrentUserHook
} from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url';

import { sanityConfig } from '@/lib/config';

export const imageBuilder = (source) =>
  createImageUrlBuilder(sanityConfig).image(source);

export const urlFor = (source) =>
  createImageUrlBuilder(sanityConfig).image(source);

export const usePreviewSubscription =
  createPreviewSubscriptionHook(sanityConfig);
export const useCurrentUser = createCurrentUserHook(sanityConfig);

export const client = createClient(sanityConfig);
export const previewClient = createClient({
  ...sanityConfig,
  token: process.env.SANITY_API_TOKEN
});

export const getClient = (usePreview) => (usePreview ? previewClient : client);
export default client;
