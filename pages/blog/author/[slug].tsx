import { useRouter } from 'next/router';
import Head from 'next/head';
import ErrorPage from 'next/error';

import {
  getAllAuthors,
  getAuthorAndRelatedPosts,
  getAuthorIdBySlug
} from '@/lib/api';

import AuthorDetails from '@/components/author/author-details';
import Container from '@/components/layout/container';
import MorePosts from '@/components/post/more-posts';
import Header from '@/components/layout/header';
import SectionSeparator from '@/components/misc/section-separator';
import Layout from '@/components/layout/layout';
import PageTitle from '@/components/misc/page-title';

export default function Author({ author, relatedPosts }) {
  const router = useRouter();
  if (!router.isFallback && !author) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <PageTitle>Translated text</PageTitle>
        ) : (
          <>
            <Head>
              <title>{author?.name} | Translated text</title>
              <meta property="og:image" content={author?.coverImage.url} />
            </Head>
            <AuthorDetails
              title={author.name}
              coverImage={author?.coverImage}
            />
            <SectionSeparator />
            {relatedPosts?.length > 0 && <MorePosts posts={relatedPosts} />}
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticPaths({ locales }) {
  const allAuthors = await getAllAuthors();
  const allPathsWithLocales = allAuthors
    .map((author) =>
      locales.map((locale) => ({
        params: {
          slug: `/author/${author.slug}`
        },
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
  const id = await getAuthorIdBySlug(params.slug, locale);
  const data = await getAuthorAndRelatedPosts(id, locale);
  return {
    props: {
      author: data?.author ?? null,
      relatedPosts: data?.relatedPosts ?? null,
      messages: (await import(`../../../messages/${locale}.json`)).default
    }
  };
}
