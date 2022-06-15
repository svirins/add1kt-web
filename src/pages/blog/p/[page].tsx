import { useTranslations } from "next-intl";
import type { ParsedUrlQuery } from "querystring";

import { Container } from "@/components/Container";
import { PageTop } from "@/components/PageTop";
import { PaginationControls } from "@/components/PaginationContols";
import { PostsGrid } from "@/components/PostsGrid";
import { Search } from "@/components/Search";
import { SectionSeparator } from "@/components/SectionSeparator";
import {
  getPageContent,
  getPaginatedPosts,
  getTotalPostsNumber,
} from "@/utils/api";
import { globalConfig } from "@/utils/global.config";

interface IParams extends ParsedUrlQuery {
  page: string;
}
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"];

export default function BlogIndexPage({
  pageData,
  paginatedPosts,
  page,
  totalPages,
}: Props) {
  const t = useTranslations("Titles");
  if (!pageData || paginatedPosts?.length === 0) {
    return <p>no data</p>;
  }

  return (
    <Container title={`${t("blog_page")} ${page}/${totalPages}`}>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <PageTop
          title={`${pageData.pageTitle} (${page}/${totalPages})`}
          subtitle=""
          pictureUrl={pageData.pagePicture}
          text={pageData.pageText}
        />
        <div className="relative w-full mb-4">
          <Search />
        </div>
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

export async function getStaticPaths({ locales }: { locales: string[] }) {
  const totalPosts = await getTotalPostsNumber();
  const totalPages = Math.ceil(totalPosts / globalConfig.pagination.pageSize);
  const allPathsWithLocales = Array.from(
    { length: totalPages - 1 },
    (_, i) => i + 1
  )
    .map((page) =>
      locales.map((locale) => ({
        params: { page: `/blog/p/${page}` },
        locale,
      }))
    )
    .flat();
  return {
    paths: allPathsWithLocales,
    fallback: "blocking",
  };
}

export async function getStaticProps({
  params,
  locale,
}: {
  params: IParams;
  locale: string;
}) {
  const paginatedPosts = await getPaginatedPosts(locale, Number(params.page));
  const pageData = await getPageContent(locale, "/");
  const totalPosts = await getTotalPostsNumber();
  const totalPages = Math.ceil(totalPosts / globalConfig.pagination.pageSize);
  return {
    props: {
      pageData,
      paginatedPosts,
      page: params.page,
      totalPages,
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
