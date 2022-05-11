import Head from 'next/head';
import {
  getTotalPostsNumber,
  getPaginatedPosts,
  getHomepageContent
} from '@/lib/api';
import Config from '@/lib/config';

import AlgoliaSearch from '../components/algolia-search';
import Container from '@/components/container';
import MorePosts from '@/components/more-posts';
import HomePage from '@/components/homepage';

import Intro from '@/components/intro';
import Layout from '@/components/layout';

export default function Index({ homePage, pagePosts, page, totalPages }) {
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

          {pagePosts.length > 0 && <MorePosts posts={pagePosts} />}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const page = 1;
  const homePage = await getHomepageContent(locale);
  const pagePosts = await getPaginatedPosts(page, locale);
  const totalPosts = await getTotalPostsNumber();
  const totalPages = Math.ceil(totalPosts / Config.pagination.pageSize);

  return {
    props: {
      homePage,
      pagePosts,
      totalPages,
      page,
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}
