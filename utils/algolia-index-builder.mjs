import algoliasearch from 'algoliasearch';
import { getPostsForAlgolia } from  './getPostsForAlgolia'

const algoliaInstance = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.ALGOLIA_SEARCH_ADMIN_KEY
);

const QUERY = `YOUR_QUERY_HERE`;

export const get = async (request) => {
  // Basic security to prevent others from hitting this API
  // const passphrase = request.query.get('passphrase');
  // if (passphrase !== process.env['ALGOLIA_SECRET']) {
  //   return {
  //     status: 401
  //   };
  // }
  const locale = 'ru'
  const data = await getPostsForAlgolia(locale);

  const index = algoliaInstance.initIndex('addict-ru');

  try {
    console.time(`Saving ${data.length} documents to index:`);
    await index.saveObjects(data);
    console.timeEnd(`Saving ${data.length} documents to index:`);
    return {
      status: 200,
      body: 'Success!'
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      body: error
    };
  }
};
