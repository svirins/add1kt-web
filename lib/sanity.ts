import { createClient } from 'next-sanity';

import { sanityConfig } from '@/lib/config';

export const client = createClient(sanityConfig);
export const previewClient = createClient({
  ...sanityConfig,
  token: process.env.SANITY_API_TOKEN
});

export default client;
