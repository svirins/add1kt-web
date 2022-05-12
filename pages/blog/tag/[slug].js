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
import { getAllTags, getTagAndRelatedPosts, getTagIdBySlug } from '@/lib/api';

export default function Tag({ tag, relatedPosts }) {
  const router = useRouter();
  if (!router.isFallback && !tag) {
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
                <title>{tag.name} | Translated text</title>
                <meta property="og:image" content={tag.coverImage.url} />
              </Head>
              <div>{tag.name}</div>
            </section>
            <SectionSeparator />
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticPaths({ locales }) {
  const allTags = await getAllTags();
  const allPathsWithLocales = allTags
    .map((tag) =>
      locales.map((locale) => ({
        params: {
          slug: `/tag/${tag.slug}`
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
  const id = await getTagIdBySlug(params.slug, locale);
  const data = await getTagAndRelatedPosts(id, locale);
  console.log('response', data?.relatedPosts);
  return {
    props: {
      tag: data?.tag ?? null,
      relatedPosts: data?.relatedPosts ?? null,
      messages: (await import(`../../../messages/${locale}.json`)).default
    }
  };
}
