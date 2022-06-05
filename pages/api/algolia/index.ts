import { NextApiRequest, NextApiResponse } from "next";
import generateAlgoliaIndex from "@/lib/algoliaindexBuilder";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // security check

  // fire generator function
  res.status(200).json({ name: 'John Doe' });
  generateAlgoliaIndex();
  console.log('webhook fired from Sanity');
}
