import { useTranslations } from 'next-intl';

import { getAllTagSlugs, getTagAndRelatedPosts } from '@/lib/api';

import Container from '@/components/layout/container';
import MorePosts from '@/components/post/more-posts';
import SectionSeparator from '@/components/misc/section-separator';
import PageTitle from '@/components/misc/page-title';
import Subtitle from '@/components/misc/subtitle';
import PostBody from '@/components/misc/post-body';

// TODO: render tagText as portable text+ reneder  authorSocilas

export default function Tag({ tag, sameTagPosts }) {
  const t = useTranslations('Titles');
  return (
    <Container type="page" title={tag.tagTitle}>
      <main className="flex flex-col justify-center items-start max-w-3xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <PageTitle>{tag.tagTitle}</PageTitle>
        <PostBody text={tag.tagText} />
        <SectionSeparator />
        <Subtitle>
          {`${t('tag_related_articles')}
          "${tag.tagTitle.toLowerCase()}"`}
        </Subtitle>
        {sameTagPosts?.length > 0 && <MorePosts posts={sameTagPosts} />}
      </main>
    </Container>
  );
}

export async function getStaticPaths({ locales }) {
  const allTags = await getAllTagSlugs();
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
  const { sameTagPosts, ...tag } = await getTagAndRelatedPosts(
    locale,
    params.slug
  );
  return {
    props: {
      tag,
      sameTagPosts,
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}
