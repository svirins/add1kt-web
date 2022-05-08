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
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api';
import { getExcerpt, getReadingTime } from '@/lib/content-utils';
import PostTitle from '@/components/post-title';

export default function Post({ post, morePosts, preview }) {
  const router = useRouter();

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>{post.title} | Next.js Blog Example</title>
                <meta property="og:image" content={post.coverImage.url} />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.sys.publishedAt}
                authors={post.authorCollection.items}
                tags={post.tagsCollection.items}
                slug={post.slug}
                featured={post.featured}
                excerpt={getExcerpt(post.content)}
                readingTime={getReadingTime(post.content)}
              />
              <PostBody content={post.content} />
            </article>
            <SectionSeparator />
            {morePosts.length > 0 && <MorePosts posts={morePosts} />}
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview);

  return {
    props: {
      preview,
      post: data?.post ?? null,
      morePosts: data?.morePosts ?? null
    }
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths: allPosts?.map(({ slug }) => `/posts/${slug}`) ?? [],
    fallback: true
  };
}
