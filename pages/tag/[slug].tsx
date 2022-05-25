import { useTranslations } from 'next-intl';

import { getAllTags, getTagAndRelatedPosts, getTagIdBySlug } from '@/lib/api';

import Container from '@/components/layout/container';
import MorePosts from '@/components/post/more-posts';
import SectionSeparator from '@/components/misc/section-separator';
import PageTitle from '@/components/misc/page-title';
import Subtitle from '@/components/misc/subtitle';

export default function Tag({ tag, relatedPosts }) {
  const t = useTranslations('Titles');
  return (
    <Container type="page" title={tag.name}>
      <main className="flex flex-col justify-center items-start max-w-3xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <PageTitle>{tag.title}</PageTitle>
        <p>{tag.description}</p>
        <SectionSeparator />
        <Subtitle>
          {`${t('tag_related_articles')}
          "${tag.title.toLowerCase()}"`}
        </Subtitle>
        {relatedPosts?.length > 0 && <MorePosts posts={relatedPosts} />}
      </main>
    </Container>
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
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params, locale }) {
  const id = await getTagIdBySlug(params.slug, locale);
  const data = await getTagAndRelatedPosts(id, locale);
  return {
    props: {
      tag: data?.tag ?? null,
      relatedPosts: data?.relatedPosts ?? null,
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}
