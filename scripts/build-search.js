import { getAllPostsForAlgolia } from '@/lib/api';
const dotenv = require('dotenv');

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

    // we have data ready for Algolia!
    console.log(transformed);
  } catch (error) {
    console.log(error);
  }
})();
