import Container from '@/components/layout/container';
import PostBody from '@/components/post/post-body';
import MorePosts from '@/components/post/more-posts';
import PostHeader from '@/components/post/post-header';
import SectionSeparator from '@/components/misc/section-separator';
import PageTitle from '@/components/misc/page-title';
import CoverImage from '@/components/image/cover-image';
import FBShare from '@/components/misc/social-share';

import { getExcerptAndReadingTime } from '@/lib/content-utils';
import { getAllSlugs, getPostAndRelatedPosts } from '@/lib/api';

export default function Post({ post, relatedPosts }) {
  const { readingTime } = getExcerptAndReadingTime(post?.body);

  return (
    <Container
      title={`${post.title} – translated text`}
      // description="seo text"
      // image={`https://leerob.io${post.image}`}
      // date={new Date(post.firstPublishedAt).toISOString()}
      type="article"
    >
      <article className="flex flex-col justify-center items-start max-w-3xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <PageTitle>{post.title}</PageTitle>
        <PostHeader
          slug={post.slug}
          date={post.sys.firstPublishedAt}
          authors={post.authorCollection.items}
          tags={post.tagsCollection.items}
          featured={post.featured}
          readingTime={readingTime}
        />
        <CoverImage title={post.title} imageData={post.coverImage} />
        <PostBody content={post.body} />
        <FBShare />
      </article>
      <SectionSeparator />
      {relatedPosts?.length > 0 && (
        <MorePosts posts={relatedPosts} isHomePage={false} />
      )}
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
