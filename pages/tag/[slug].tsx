import { useTranslations } from 'next-intl';

import { getAllTagSlugs, getTagAndRelatedPosts } from '@/lib/api';

import Container from '@/components/Container';
import SectionSeparator from '@/components/SectionSeparator';
import Subtitle from '@/components/Subtitle';
import PostsGrid from '@/components/PostsGrid';
import PageTop from '@/components/PageTop';

export default function Tag({ tag, sameTagPosts }) {
  const t = useTranslations('Titles');
  return (
    <Container type="page" title={tag.tagTitle}>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <PageTop
          title={tag.tagTitle}
          subtitle=""
          pictureUrl={tag.tagPicture}
          text={tag.tagText}
        />
        <SectionSeparator />
        <Subtitle>
          {`${t('tag_related_articles')}
          "${tag.tagTitle.toLowerCase()}"`}
        </Subtitle>
        {sameTagPosts && <PostsGrid posts={sameTagPosts} />}
      </div>
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
