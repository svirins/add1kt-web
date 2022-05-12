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
import PageTitle from '@/components/page-title';
import {
  getAllAuthors,
  getAuthorAndRelatedPosts,
  getAuthorIdBySlug
} from '@/lib/api';

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
            <section>
              <Head>
                <title>{author.name} | Translated text</title>
                <meta property="og:image" content={author.coverImage.url} />
              </Head>
              <div>{author.name}</div>
            </section>
            <SectionSeparator />
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
  console.log('response', data?.relatedPosts);
  return {
    props: {
      author: data?.author ?? null,
      relatedPosts: data?.relatedPosts ?? null,
      messages: (await import(`../../../messages/${locale}.json`)).default
    }
  };
}
