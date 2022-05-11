import Head from 'next/head';
import { getFeaturedPosts, getHomepageContent } from '@/lib/api';

import AlgoliaSearch from '../components/algolia-search';
import Container from '@/components/container';
import MorePosts from '@/components/more-posts';
import HomePage from '@/components/homepage';

import Intro from '@/components/intro';
import Layout from '@/components/layout';
import MorepostsControls from '@/components/moreposts-controls';

export default function Index({ homePage, pagePosts }) {
  return (
    <>
      <Layout preview={false}>
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

          {pagePosts.length > 0 && (
            <MorePosts isHomePage={true} posts={pagePosts} />
          )}
          <MorepostsControls />
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const homePage = await getHomepageContent(locale);
  const pagePosts = await getFeaturedPosts(locale);

  return {
    props: {
      homePage,
      pagePosts,
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}
