import Container from '@/components/Container';
import SectionSeparator from '@/components/SectionSeparator';
import PostsGrid from '@/components/PostsGrid';
import {
  getPaginatedPosts,
  getTotalPostsNumber,
  getPageContent
} from '@/lib/api';
import { useTranslations } from 'next-intl';

import { globalConfig } from '@/lib/config';

import PageTop from '@/components/PageTop';
import PaginationControls from '@/components/PaginationContols';

export default function BlogIndexPage({
  pageData,
  paginatedPosts,
  page,
  totalPages
}) {
  const t = useTranslations('Titles');
  if (!pageData || paginatedPosts?.lenght === 0) return <p>no data</p>;

  return (
    <Container title={`${t('blog_page')} ${page}/${totalPages}`} type="page">
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <PageTop
          title={`${pageData.pageTitle} (${page}/${totalPages})`}
          subtitle=""
          pictureUrl={pageData.pagePicture}
          text={pageData.pageText}
        />
        <SectionSeparator />
        {paginatedPosts?.length > 0 && <PostsGrid posts={paginatedPosts} />}
        <PaginationControls
          currentPage={Number(page)}
          totalPages={Number(totalPages)}
        />
      </div>
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
  const paginatedPosts = await getPaginatedPosts(locale, Number(params.page));
  const pageData = await getPageContent(locale, '/');
  const totalPosts = await getTotalPostsNumber();
  const totalPages = Math.ceil(totalPosts / globalConfig.pagination.pageSize);
  return {
    props: {
      pageData,
      paginatedPosts: paginatedPosts,
      page: params.page,
      totalPages: totalPages,
      messages: (await import(`../../../messages/${locale}.json`)).default
    }
  };
}
