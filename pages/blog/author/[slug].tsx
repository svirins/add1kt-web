import {
  getAllAuthors,
  getAuthorAndRelatedPosts,
  getAuthorIdBySlug
} from '@/lib/api';

import AuthorDetails from '@/components/author/author-details';
import Container from '@/components/layout/container';
import MorePosts from '@/components/post/more-posts';
import SectionSeparator from '@/components/misc/section-separator';

export default function Author({ author, relatedPosts }) {
  return (
    <Container
      // title={ }
      // description={}
      // image={ }
      // date={ }
      type="page"
    >
      <main className="flex flex-col justify-center items-start max-w-3xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <AuthorDetails title={author.name} coverImage={author?.coverImage} />
        <SectionSeparator />
        {relatedPosts?.length > 0 && <MorePosts posts={relatedPosts} />}
      </main>
    </Container>
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
    fallback: 'blocking'
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
