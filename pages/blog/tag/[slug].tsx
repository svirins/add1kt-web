import { useRouter } from 'next/router';
import Head from 'next/head';
import ErrorPage from 'next/error';

import { getAllTags, getTagAndRelatedPosts, getTagIdBySlug } from '@/lib/api';

import TagDetails from '@/components/tag/tag-details';
import Container from '@/components/layout/container';
import MorePosts from '@/components/post/more-posts';
import SectionSeparator from '@/components/misc/section-separator';
import Layout from '@/components/layout/layout';
import PageTitle from '@/components/misc/page-title';

export default function Tag({ tag, relatedPosts }) {
  const router = useRouter();
  if (!router.isFallback && !tag) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Container>
        {router.isFallback ? (
          <PageTitle>Translated text</PageTitle>
        ) : (
          <>
            <Head>
              <title>{tag?.title} | Translated text</title>
              <meta property="og:image" content={tag?.coverImage.url} />
            </Head>
            <TagDetails title={tag.title} coverImage={tag?.coverImage} />
            <SectionSeparator />
            {relatedPosts?.length > 0 && <MorePosts posts={relatedPosts} />}
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

  console.log('dats', data);
  return {
    props: {
      tag: data?.tag ?? null,
      relatedPosts: data?.relatedPosts ?? null,
      messages: (await import(`../../../messages/${locale}.json`)).default
    }
  };
}
