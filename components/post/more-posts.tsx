import { getExcerptAndReadingTime } from '@/lib/content-utils';

import PostCard from '@/components/post/post-card';
export default function MorePosts({ posts }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12 gap-y-10 mb-12">
      {posts.map((post) => {
        const { readingTime } = getExcerptAndReadingTime(post.body);
        return (
          <PostCard
            key={post.slug}
            title={post.title}
            previewImage={post.coverImage}
            date={post.sys.firstPublishedAt}
            author={post.authorCollection.items[0]}
            tags={post.tagsCollection.items}
            slug={post.slug}
            readingTime={readingTime}
          />
        );
      })}
    </section>
  );
}
