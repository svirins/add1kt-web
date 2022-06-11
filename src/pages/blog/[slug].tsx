import { useTranslations } from 'next-intl';

import { Container } from '@/components/Container';
import { PostBody } from '@/components/PostBody';
import { PostMeta } from '@/components/PostMeta';
import { PostsGrid } from '@/components/PostsGrid';
import { SanityImage } from '@/components/SanityImage';
import { SectionSeparator } from '@/components/SectionSeparator';
import { Subtitle } from '@/components/Subtitle';
import { Tags } from '@/components/Tags';
import { globalConfig } from '@/config/global.config';
import { getAllPostSlugs, getPostAndRelatedPosts } from '@/lib/api';

export default function Post({ post, relatedPosts }) {
  const t = useTranslations('Titles');
  if (!post || relatedPosts?.lenght === 0) return <p>no data</p>;
  return (
    <Container
      title={post.postTitle}
      ogImage={post.postImageUrl}
      date={post.postDate}
      type="article"
    >
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto pb-16">
        <div className="flex flex-col">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight  text-gray-800 dark:text-gray-200">
            {post.postTitle}
          </h1>
          <div className="flex flex-row text-sm justify-end mb-2 py-2">
            <Tags tags={post.tags} />
          </div>
          <SanityImage
            alt={post.postTitle}
            url={post.postImageUrl}
            width={globalConfig.images.defaultPostImageWidth}
            height={globalConfig.images.defaultPostImageHeight}
          />

          <div className="flex flex-row mt-4 pt-2">
            <PostMeta
              date={post.postDate}
              readingTime={post.readingTime}
              author={post.author}
            />
          </div>
        </div>
        <PostBody text={post.postText} />
        <SectionSeparator />
        <Subtitle>{t('related_posts')}</Subtitle>
        {relatedPosts && <PostsGrid posts={relatedPosts} />}
      </div>
    </Container>
  );
}

export async function getStaticPaths({ locales }) {
  const allPosts = await getAllPostSlugs();
  const allPathsWithLocales = allPosts
    .map(({ slug }) =>
      locales.map((locale) => ({
        params: { slug: `/blog/${slug}` },
        locale
      }))
    )
    .flat();
  return {
    paths: allPathsWithLocales,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params, locale }) {
  const { relatedPosts, ...post } = await getPostAndRelatedPosts(
    locale,
    params.slug.replace(/\/$/, '').split('/').pop()
  );
  return {
    props: {
      post,
      relatedPosts,
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}
