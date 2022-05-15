import { NextApiRequest, NextApiResponse } from 'next';
// FIXME: correct types

export default async function fetcher<JSON = any>(
  input: NextApiRequest,
  init?: NextApiResponse
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}
