import { getExcerptAndReadingTime } from '@/lib/content-utils';

import PostPreview from '@/components/post/post-preview';
export default function MorePosts({ posts }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12 md:gap-y-8 mb-16">
      {posts.map((post) => {
        const { excerpt, readingTime } = getExcerptAndReadingTime(post.body);
        return (
          <PostPreview
            key={post.slug}
            title={post.title}
            previewImage={post.coverImage}
            date={post.sys.firstPublishedAt}
            authors={post.authorCollection.items}
            tags={post.tagsCollection.items}
            slug={post.slug}
            readingTime={readingTime}
          />
        );
      })}
    </section>
  );
}
