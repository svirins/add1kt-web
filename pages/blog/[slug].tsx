import { useTranslations } from 'next-intl';

import Container from '@/components/layout/container';
import PostBody from '@/components/post/post-body';
import MorePosts from '@/components/post/more-posts';
import SectionSeparator from '@/components/misc/section-separator';
import PageTitle from '@/components/misc/page-title';
import CoverImage from '@/components/image/cover-image';
import FBShare from '@/components/misc/social-share';
import Authors from '@/components/author/authors';
import Tags from '@/components/tag/tags';
import PostDetails from '@/components/post/post-details';

import { getExcerptAndReadingTime } from '@/lib/content-utils';
import { getAllSlugs, getPostAndRelatedPosts } from '@/lib/api';

export default function Post({ post, relatedPosts }) {
  const { readingTime } = getExcerptAndReadingTime(post?.body);
  const t = useTranslations('Post');

  return (
    <Container
      title={`${post.title} – translated text`}
      // description="seo text"
      image={post.coverImage.url}
      date={post.sys.firstPublishedAt}
      type="article"
    >
      <article className="flex flex-col justify-center items-start max-w-3xl w-full border-gray-200 dark:border-gray-700 mx-auto mb-16">
        <PageTitle>{post.title}</PageTitle>
        <div className="flex flex-col items-start w-full mt-2 md:flex-row md:items-center">
          <div
            className="flex items-
          "
          >
            <div className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              <PostDetails
                date={post.sys.firstPublishedAt}
                readingTime={readingTime}
              />
              <div className="flex flex-row mb-4 text-sm">
                <Tags
                  tags={post.tagsCollection.items}
                  featured={post.featured}
                />
              </div>
              <div className="flex flex-row mb-4">
                <Authors authors={post.authorCollection.items} />
              </div>
            </div>
          </div>
        </div>
        <CoverImage
          title={post.title}
          width={post.coverImage.width}
          height={post.coverImage.height}
          url={post.coverImage.url}
        />
        <PostBody content={post.body} />
        <FBShare />
      </article>
      <SectionSeparator />
      {relatedPosts?.length > 0 && (
        <MorePosts posts={relatedPosts} title={t('related_posts')} />
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
