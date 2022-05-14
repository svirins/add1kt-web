/* eslint-disable no-unused-vars */
import { getTotalPostsNumber, getPaginatedPosts } from '@/lib/api';
import Config from '@/config/global-config';
import Container from '@/components/layout/container';
import MorePosts from '@/components/post/more-posts';
import SectionSeparator from '@/components/misc/section-separator';
import PaginationControls from '@/components/post/pagination-controls';

export default function BlogIndexPage({ pagePosts, page, totalPages }) {
  return (
    <Container
      // title={ }
      // description={}
      // image={ }
      // date={ }
      type="page"
    >
      <main className="flex flex-col justify-center items-start max-w-3xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        {pagePosts?.length > 0 && (
          <MorePosts posts={pagePosts} isHomePage={false} />
        )}
        <PaginationControls
          currentPage={Number(page)}
          totalPages={Number(totalPages)}
        />
      </main>
    </Container>
  );
}

export async function getStaticPaths({ locales }) {
  const totalPosts = await getTotalPostsNumber();
  const totalPages = Math.ceil(totalPosts / Config.pagination.pageSize);

  const allPathsWithLocales = Array.from(
    { length: totalPages - 1 },
    (_, i) => i + 1
  )
    .map((page) =>
      locales.map((locale) => ({
        params: { page: `/page/${page}` },
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
  const pagePosts = await getPaginatedPosts(Number(params.page), locale);
  const totalPosts = await getTotalPostsNumber();
  const totalPages = Math.ceil(totalPosts / Config.pagination.pageSize);

  return {
    props: {
      pagePosts: pagePosts,
      page: params.page,
      totalPages: totalPages,
      messages: (await import(`../../../messages/${locale}.json`)).default
    }
  };
}
