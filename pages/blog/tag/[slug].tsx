import { getAllTags, getTagAndRelatedPosts, getTagIdBySlug } from '@/lib/api';

import TagDetails from '@/components/tag/tag-details';
import Container from '@/components/layout/container';
import MorePosts from '@/components/post/more-posts';
import SectionSeparator from '@/components/misc/section-separator';

export default function Tag({ tag, relatedPosts }) {
  return (
    <Container
      // title={ }
      // description={}
      // image={ }
      // date={ }
      type="page"
    >
      <main className="flex flex-col justify-center items-start max-w-3xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <TagDetails title={tag?.title} coverImage={tag?.coverImage} />
        <SectionSeparator />
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
      messages: (await import(`../../../messages/${locale}.json`)).default
    }
  };
}
