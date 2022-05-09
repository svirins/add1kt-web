import Container from '@/components/container';
import MorePosts from '@/components/more-posts';
import HeroPost from '@/components/hero-post';
import Intro from '@/components/intro';
import Layout from '@/components/layout';
import { getAllPostsForHome } from '@/lib/api';
import { getExcerptAndReadingTime } from '@/lib/content-utils';
import Head from 'next/head';

export default function Index({ allPosts }) {
  // TODO: get locale and pass it to components
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  const { excerpt, readingTime } = getExcerptAndReadingTime(heroPost.body, 350);
  return (
    <>
      <Layout preview={false}>
        <Head>
          <title>Next.js Blog Example</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.sys.firstPublishedAt}
              authors={heroPost.authorCollection.items}
              tags={heroPost.tagsCollection.items}
              slug={heroPost.slug}
              featured={heroPost.featured}
              excerpt={excerpt}
              readingTime={readingTime}
            />
          )}
          {morePosts.length > 0 && <MorePosts posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale, locales }) {
  const allPosts = (await getAllPostsForHome()) ?? [];
  return {
    props: { allPosts }
  };
}
