import { useTranslations } from 'next-intl';
import { getExcerptAndReadingTime } from '@/lib/content-utils';

import PostPreview from '@/components/post-preview';

export default function MorePosts({ posts, isHomePage = false }) {
  const t = useTranslations('Post');

  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        {isHomePage ? t('featured_posts') : t('paginated_posts')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
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
