import { useRouter } from 'next/router';
import Head from 'next/head';
import ErrorPage from 'next/error';
import Container from '@/components/container';
import PostBody from '@/components/post-body';
import MorePosts from '@/components/more-posts';
import Header from '@/components/header';
import PostHeader from '@/components/post-header';
import SectionSeparator from '@/components/section-separator';
import Layout from '@/components/layout';
import PostTitle from '@/components/post-title';
import { getExcerptAndReadingTime } from '@/lib/content-utils';
import { getAllSlugs, getPostAndMorePosts } from '@/lib/api';

export default function Post({ post, morePosts }) {
  const router = useRouter();

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }
  const { readingTime } = getExcerptAndReadingTime(post.body);

  return (
    <Layout preview={false}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Translated text</PostTitle>
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
                slug={post.slug}
                featured={post.featured}
                readingTime={readingTime}
              />
              <PostBody content={post.body} />
            </article>
            <SectionSeparator />
            {morePosts.length > 0 && <MorePosts posts={morePosts} />}
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticPaths({ locales }) {
  const allPosts = await getAllSlugs();
  // const allPathsWithLocales =
  return {
    paths: allPosts?.map(({ slug }) => `/blog/${slug}`) ?? [],
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  const data = await getPostAndMorePosts(params.slug, params.locale);
  return {
    props: {
      post: data?.post ?? null,
      morePosts: data?.morePosts ?? null
    }
  };
}

// { params: { slug: `/blog/${slug}`) ?? [] }, locale: locale },
