import { getAllPostsForAlgolia } from '@/lib/api';
const dotenv = require('dotenv');
const algoliasearch = require('algoliasearch/lite');

function transformPostsToSearchObjects(posts) {
  const transformed = posts.map((post) => {
    return {
      objectID: post.sys.id,
      locale: post.sys.locale,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      slug: post.slug,
      authorCollection: { items: post.authorCollection.items },
      tagsCollection: { items: post.authorCollection.items },
      date: post.sys.publishedAt
    };
  });

  return transformed;
}

(async function () {
  dotenv.config();
  try {
    const posts = await getAllPostsForAlgolia();
    const transformed = transformPostsToSearchObjects(posts);

    // initialize the client with your environment variables
    const client = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
      process.env.ALGOLIA_SEARCH_ADMIN_KEY
    );

    // initialize the index with your index name
    const index = client.initIndex('dev_addicts');

    // save the objects!
    const algoliaResponse = await index.saveObjects(transformed);

    // check the output of the response in the console
    console.log(
      `🎉 Sucessfully added ${
        algoliaResponse.objectIDs.length
      } records to Algolia search. Object IDs:\n${algoliaResponse.objectIDs.join(
        '\n'
      )}`
    );
  } catch (error) {
    console.log(error);
  }
})();
