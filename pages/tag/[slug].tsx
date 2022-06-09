import { useTranslations } from 'next-intl';

import { Container } from '@/components/Container';
import { PageTop } from '@/components/PageTop';
import { PostsGrid } from '@/components/PostsGrid';
import { SectionSeparator } from '@/components/SectionSeparator';
import { Subtitle } from '@/components/Subtitle';
import { getAllTagSlugs, getTagAndRelatedPosts } from '@/lib/api';

export default function Tag({ tag, sameTagPosts }) {
  const t = useTranslations('Titles');
  return (
    <Container title={tag.tagTitle} ogImage={tag.tagPicture}>
      <div className="mx-auto flex max-w-2xl flex-col items-start justify-center pb-16">
        {tag && (
          <>
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
          </>
        )}
        {sameTagPosts?.length > 0 && <PostsGrid posts={sameTagPosts} />}
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
          slug: `/tag/${tag.slug}`,
        },
        locale,
      }))
    )
    .flat();
  return {
    paths: allPathsWithLocales,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params, locale }) {
  const { sameTagPosts, ...tag } = await getTagAndRelatedPosts(
    locale,
    params.slug.replace(/\/$/, '').split('/').pop()
  );
  return {
    props: {
      tag,
      sameTagPosts,
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}
