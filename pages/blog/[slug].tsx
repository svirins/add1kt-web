import { useTranslations } from 'next-intl';

import Tags from '@/components/tag/tags';
import PostMeta from '@/components/post/post-meta';
import { ResponsiveImage } from '@/components/image/next-sanity-image';

import Container from '@/components/layout/container';
import PostBody from '@/components/misc/post-body';
import MorePosts from '@/components/post/more-posts';
import SectionSeparator from '@/components/misc/section-separator';
import Subtitle from '@/components/misc/subtitle';

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
          <ResponsiveImage alt={post.postTitle} url={post.postImageUrl} />
          <h4 className="w-full my-4 text-base font-medium  md:text-lg hover:text-teal-600  transition-all delay-100 dark:hover:text-teal-400 ">
            {post.postTitle}
          </h4>
          <div className="flex flex-row ">
            <PostMeta
              date={post.postDate}
              readingTime={post.readingTime}
              author={post.author}
            />
          </div>
          <div className="flex flex-row text-sm">
            <Tags tags={post.tags} />
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
