import { useRouter } from 'next/router';
import Head from 'next/head';
import ErrorPage from 'next/error';
import Container from '@/components/layout/container';
import PostBody from '@/components/post/post-body';
import MorePosts from '@/components/post/more-posts';
import PostHeader from '@/components/post/post-header';
import SectionSeparator from '@/components/misc/section-separator';
import Layout from '@/components/layout/layout';
import PageTitle from '@/components/misc/page-title';
import { getExcerptAndReadingTime } from '@/lib/content-utils';
import { getAllSlugs, getPostAndRelatedPosts } from '@/lib/api';

export default function Post({ post, relatedPosts }) {
  const router = useRouter();
  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }
  const { readingTime } = getExcerptAndReadingTime(post?.body);

  return (
    <Layout>
      <Container>
        {router.isFallback ? (
          <PageTitle>Translated text</PageTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>{post.title} | Translated text</title>
                <meta property="og:image" content={post.coverImage.url} />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.sys.firstPublishedAt}
                authors={post.authorCollection.items}
                tags={post.tagsCollection.items}
                featured={post.featured}
                readingTime={readingTime}
              />
              <PostBody content={post.body} />
            </article>
            <SectionSeparator />
            {relatedPosts?.length > 0 && (
              <MorePosts posts={relatedPosts} isHomePage={false} />
            )}
          </>
        )}
      </Container>
    </Layout>
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
    fallback: true
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
