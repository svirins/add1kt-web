import { useTranslations } from 'next-intl';

import PostHeader from '@/components/post/post-header';
import Container from '@/components/layout/container';
import PostBody from '@/components/post/post-body';
import MorePosts from '@/components/post/more-posts';
import SectionSeparator from '@/components/misc/section-separator';
import FBShare from '@/components/misc/social-share';
import Subtitle from '@/components/misc/subtitle';

import { getAllPostSlugs, getPostAndRelatedPosts } from '@/lib/api';

export default function Post({ post, relatedPosts }) {
  const t = useTranslations('Titles');
  return (
    <Container
      title={`${post?.postTitle}`}
      imageUrl={post.postImageUrl}
      date={post.postDate}
      type="article"
    >
      <article className="flex flex-col justify-center items-start max-w-3xl mx-auto pb-16">
        <PostHeader
          key={post.postSlug}
          title={post.postTitle}
          previewImage={post.postImageUrl}
          date={post.postDate}
          author={post.author}
          tags={post.tags}
          slug={post.postSlug}
          readingTime={post.readingTime}
        />
        <PostBody content={post.postText} />
        <FBShare />
      </article>
      <SectionSeparator />
      <Subtitle>{t('related_posts')}</Subtitle>
      {relatedPosts?.length > 0 && <MorePosts posts={relatedPosts} />}
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
  const { relatedPosts, ...post } = await getPostAndRelatedPosts(locale, params.slug);
  return {
    props: {
      post,
      relatedPosts,
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}
