import Head from 'next/head';
import { getFeaturedPosts, getPageContent } from '@/lib/api';

import AlgoliaSearch from '@/components/search/algolia-search';

import Container from '@/components/layout/container';
import MorePosts from '@/components/post/more-posts';
import HomePage from '@/components/page/homepage';

import Intro from '@/components/misc/intro';
import Layout from '@/components/layout/layout';
import MorepostsControls from '@/components/post/moreposts-controls';

export default function About({ homePage, pagePosts }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example</title>
        </Head>
        <Container>
          <Intro />
          <AlgoliaSearch />
          {homePage && (
            <HomePage
              title={homePage.title}
              coverImage={homePage.coverImage}
              body={homePage.body}
            />
          )}

          {pagePosts?.length > 0 && (
            <MorePosts isHomePage={true} posts={pagePosts} />
          )}
          <MorepostsControls />
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const pagePosts = await getFeaturedPosts(locale);
  const homePage = await getPageContent(locale, 'about');
  return {
    props: {
      homePage,
      pagePosts,
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}
