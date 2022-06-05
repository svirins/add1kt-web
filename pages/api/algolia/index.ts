import { NextApiRequest, NextApiResponse } from "next";
import generateAlgoliaIndex from "@/lib/algoliaindexBuilder";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req)
  // security check
try {
  const result = await generateAlgoliaIndex();
  res.status(200).json({ result });
} catch (err) {
  res.status(500).json({ error: 'failed to load data' });
}
  // fire generator function
}
