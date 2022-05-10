/* eslint-disable no-unused-vars */
import Head from 'next/head';
import { getTotalPostsNumber, getPaginatedPosts } from '@/lib/api';
import Config from '@/lib/config';

import Container from '@/components/container';
import MorePosts from '@/components/more-posts';
import Intro from '@/components/intro';
import Layout from '@/components/layout';

export default function BlogIndexPage({ pagePosts, page, totalPages }) {
  console.log('page', page, 'totalPages', totalPages, 'pagePosts', pagePosts);
  return (
    <>
      <Layout preview={false}>
        <Head>
          <title>Next.js Blog Example</title>
        </Head>
        <Container>
          <Intro />
          {/* {pagePosts.length > 0 && <MorePosts posts={pagePosts} />} */}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticPaths({ locales }) {
  const totalPosts = await getTotalPostsNumber();
  const totalPages = Math.ceil(totalPosts / Config.pagination.pageSize);

  const allPathsWithLocales = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  )
    .map((page) =>
      locales.map((locale) => ({
        params: { page: `/page/${page}` },
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
  const pagePosts = await getPaginatedPosts(Number(params.page), locale);
  const totalPosts = await getTotalPostsNumber();
  const totalPages = Math.ceil(totalPosts / Config.pagination.pageSize);

  return {
    props: {
      pagePosts: pagePosts,
      page: params.page,
      totalPages: totalPages
    }
  };
}
