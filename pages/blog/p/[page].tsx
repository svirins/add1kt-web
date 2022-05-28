import Container from '@/components/layout/container';
import PageTitle from '@/components/misc/page-title';
import SectionSeparator from '@/components/misc/section-separator';
import MorePosts from '@/components/post/more-posts';
import { getPaginatedPosts, getTotalPostsNumber } from '@/lib/api';
import { useTranslations } from 'next-intl';

import { globalConfig } from '@/lib/config';

import PaginationControls from '@/components/post/pagination-controls';

export default function BlogIndexPage({ pagePosts, page, totalPages }) {
  const t = useTranslations('Titles');

  return (
    <Container
      title={`${t('blog_page')} ${page}/${totalPages}`}
      // description={}
      // image={ }
      // date={ }
      type="page"
    >
      <main className="flex flex-col justify-center items-start max-w-3xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <PageTitle>{`${t('blog_page')} ${page}/${totalPages}`}</PageTitle>
        <SectionSeparator />
        {pagePosts?.length > 0 && <MorePosts posts={pagePosts} />}
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
  const totalPages = Math.ceil(totalPosts / globalConfig.pagination.pageSize);

  const allPathsWithLocales = Array.from(
    { length: totalPages - 1 },
    (_, i) => i + 1
  )
    .map((page) =>
      locales.map((locale) => ({
        params: { page: `/blog/p/${page}` },
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
  const pagePosts = await getPaginatedPosts(locale, Number(params.page));
  const totalPosts = await getTotalPostsNumber();
  const totalPages = Math.ceil(totalPosts / globalConfig.pagination.pageSize);
  return {
    props: {
      pagePosts: pagePosts,
      page: params.page,
      totalPages: totalPages,
      messages: (await import(`../../../messages/${locale}.json`)).default
    }
  };
}
