import { useTranslations } from 'next-intl';

import Tags from '@/components/Tags';
import PostMeta from '@/components/PostMeta';
import ResponsiveImage from '@/components/ResponsiveImage';

import Container from '@/components/Container';
import PostBody from '@/components/PostBody';
import MorePosts from '@/components/MorePosts';
import SectionSeparator from '@/components/SectionSeparator';
import Subtitle from '@/components/Subtitle';

import { getAllPostSlugs, getPostAndRelatedPosts } from '@/lib/api';

export default function Post({ post, relatedPosts }) {
  const t = useTranslations('Titles');
  return (
    <Container
      title={post.postTitle}
      imageUrl={post.postImageUrl}
      date={post.postDate}
      type="article"
    >
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <div className="flex flex-col">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight">
            {post.postTitle}
          </h1>
          <div className="flex flex-row text-sm justify-end mb-4">
            <Tags tags={post.tags} />
          </div>
          <ResponsiveImage alt={post.postTitle} url={post.postImageUrl} />

          <div className="flex flex-row mt-4">
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
        {relatedPosts && <MorePosts posts={relatedPosts} />}
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
        locale: locale
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
    params.slug
  );
  return {
    props: {
      post,
      relatedPosts,
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}
