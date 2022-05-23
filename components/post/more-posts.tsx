import { useTranslations } from 'next-intl';
import { getExcerptAndReadingTime } from '@/lib/content-utils';

import PostPreview from '@/components/post/post-preview';

export default function MorePosts({ posts, subtitle = '' }) {
  const t = useTranslations('Post');

  return (
    <section>
      {subtitle ?? (
        <h2 className="mb-8 text-3xl font-medium tracking-tight text-black md:text-5xl dark:text-white">
          {subtitle}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12 md:gap-y-8 mb-16">
        {posts.map((post) => {
          const { excerpt, readingTime } = getExcerptAndReadingTime(post.body);
          return (
            <PostPreview
              key={post.slug}
              title={post.title}
              coverImage={post.coverImage}
              date={post.sys.firstPublishedAt}
              authors={post.authorCollection.items}
              tags={post.tagsCollection.items}
              slug={post.slug}
              featured={post.featured}
              excerpt={excerpt}
              readingTime={readingTime}
            />
          );
        })}
      </div>
    </section>
  );
}
