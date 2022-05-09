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

export default function Post({ post, morePosts, preview }) {
  const router = useRouter();

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }
  const { excerpt, readingTime } = getExcerptAndReadingTime(post.body);
  // TODO: implement tailwind-typography article-wide
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article claasName="prose lg:prose-xl prose-slate prose-img:rounded-xl prose-headings:underline prose-a:text-blue-600">
              <Head>
                <title>{post.title} | Next.js Blog Example</title>
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
                excerpt={excerpt}
                readingTime={readingTime}
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

export async function getStaticPaths() {
  const allPosts = await getAllSlugs();
  return {
    paths: allPosts?.map(({ slug }) => `/posts/${slug}`) ?? [],
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  const data = await getPostAndMorePosts(params.slug);
  console.log('data', data);
  return {
    props: {
      preview: false,
      post: data?.post ?? null,
      morePosts: data?.morePosts ?? null
    }
  };
}
