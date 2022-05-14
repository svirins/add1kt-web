import Head from 'next/head';
import { getFeaturedPosts, getPageContent } from '@/lib/api';
import Config from '@/config/global-config';

import AlgoliaSearch from '@/components/search/algolia-search-autocomplete';
import Container from '@/components/layout/container';
import MorePosts from '@/components/more-posts';
import HomePage from '@/components/homepage';
import SectionSeparator from '@/components/section-separator';

import Intro from '@/components/intro';
import Layout from '@/components/layout/layout';
import MorepostsControls from '@/components/moreposts-controls';

export default function Index({ pageData, pagePosts }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example</title>
        </Head>
        <Container>
          <Intro />
          <AlgoliaSearch />
          {pageData && (
            <HomePage
              title={pageData.title}
              coverImage={pageData.coverImage}
              body={pageData.body}
            />
          )}
          <SectionSeparator />
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
  const pageData = await getPageContent(locale, Config.routes.homepageSlug);
  return {
    props: {
      pageData,
      pagePosts,
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}
