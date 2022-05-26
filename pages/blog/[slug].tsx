import { useTranslations, } from 'next-intl';

import Container from '@/components/layout/container';
import PostBody from '@/components/post/post-body';
import MorePosts from '@/components/post/more-posts';
import SectionSeparator from '@/components/misc/section-separator';
import PageTitle from '@/components/misc/page-title';
import HeroImage from '@/components/image/hero-image';
import FBShare from '@/components/misc/social-share';
import Tags from '@/components/tag/tags';
import PostDetails from '@/components/post/post-details';
import Subtitle from '@/components/misc/subtitle';
import Avatar from '@/components/author/avatar';

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
      <article className="flex justify-center items-start max-w-3xl w-full mx-auto mb-16">
        <section id="post-header" className="flex">
          {/* <div>
            <HeroImage title={post.title} url={post.coverImage.url} />
          </div> */}
          <div className="flex flex-row">
            <div className="flex flex-1 mb-4 items-start">
              {post && (
              <PostDetails
                author={post.authorCollection.items[0]}
                date={post.sys.firstPublishedAt}
                readingTime={readingTime}
              />
              )}

            </div>
            <PageTitle>{post.title}</PageTitle>

            <div className="flex flex-row mb-4 text-sm">
              <Tags tags={post.tagsCollection.items} />
            </div>
          </div>
        </section>
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
