import { useTranslations, } from 'next-intl';

import PostHeader from '@/components/post/post-header';
import Container from '@/components/layout/container';
import PostBody from '@/components/post/post-body';
import MorePosts from '@/components/post/more-posts';
import SectionSeparator from '@/components/misc/section-separator';
import FBShare from '@/components/misc/social-share';
import Subtitle from '@/components/misc/subtitle';

import { getExcerptAndReadingTime } from '@/lib/content-utils';
import { getAllSlugs, getPostAndRelatedPosts } from '@/lib/api';

export default function Post({ post, relatedPosts }) {
  const { readingTime } = getExcerptAndReadingTime(post?.body);
  const t = useTranslations('Titles');
  return (
    <Container
      title={`${post?.title}`}
      imageUrl={post.coverImage.url}
      date={post.sys.firstPublishedAt}
      type="article"
    >
      <article className="flex flex-col justify-center items-start max-w-3xl mx-auto pb-16">
        <PostHeader
          key={post.slug}
          title={post.title}
          previewImage={post.coverImage}
          date={post.sys.firstPublishedAt}
          author={post.authorCollection.items[0]}
          tags={post.tagsCollection.items}
          slug={post.slug}
          readingTime={readingTime}
        />
        <PostBody content={post.body} />
        <FBShare />
        </article>
      <SectionSeparator />
      <Subtitle>{t('related_posts')}</Subtitle>
      {relatedPosts?.length > 0 && <MorePosts posts={relatedPosts} />}
    </Container>
  );
}

export async function getStaticPaths({ locales }) {
  const allPosts = await getAllSlugs();
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
  const data = await getPostAndRelatedPosts(params.slug, locale);
  return {
    props: {
      post: data?.post ?? null,
      relatedPosts: data?.relatedPosts ?? null,
      messages: (await import(`../../messages/${locale}.json`)).default
    }

  };
}
