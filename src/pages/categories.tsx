import Link from "next/link";
import { useTranslations } from "next-intl";

import { Container } from "@/components/Container";
import { getAuthorsAndRelatedPostsCount, getTagsAndRelatedPostsCount } from "@/utils/api";

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"];

export default function GetAllAuthorsAndTags({ authors, tags }: Props) {
  const t = useTranslations("Titles");
  const sortedAutors = authors.sort((a, b) => b.relatedPostsCount - a.relatedPostsCount);
  const sortedTags = tags.sort((a, b) => b.relatedPostsCount - a.relatedPostsCount);
  return (
    <Container title={t("categories")}>
      <div className="mx-auto flex  min-h-screen max-w-2xl flex-col items-start justify-center">
        <div className="flex flex-col items-start justify-start divide-y divide-gray-300 dark:divide-gray-500 md:mb-6 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
          <div className="space-x-2 pt-2 pb-4 md:space-y-5">
            <h1 className="gradient-header text-3xl font-bold tracking-tight sm:leading-10 md:border-r-2   md:pr-6 md:text-5xl">
              {t("authors")}
            </h1>
          </div>
          <div className="flex max-w-lg flex-wrap">
            {sortedAutors &&
              sortedAutors.length > 0 &&
              sortedAutors.map((author) => (
                <div key={author.authorSlug} className="mt-2 mb-2 mr-5">
                  <Link href={`/author/${author.authorSlug}`}>
                    <a className="mr-3 text-base font-medium text-teal-600 transition-all delay-100 hover:text-teal-800 dark:hover:text-teal-400">
                      {`${author.authorName} (${author.relatedPostsCount})`}
                    </a>
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <div className="mb-6 flex flex-col items-start justify-start divide-y divide-gray-300 dark:divide-gray-500 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
          <div className="space-x-2 pt-2 pb-4 md:space-y-5">
            <h1 className="gradient-header text-3xl font-bold tracking-tight sm:leading-10 md:border-r-2   md:pr-6 md:text-5xl">
              {t("tags")}
            </h1>
          </div>
          <div className="flex max-w-lg flex-wrap">
            {sortedTags &&
              sortedTags.length > 0 &&
              sortedTags.map((tag) => (
                <div key={tag.tagSlug} className="mt-2 mb-2 mr-5">
                  <Link href={`/tag/${tag.tagSlug}`}>
                    <a className="mr-3 text-base font-medium  text-teal-600 transition-all delay-100 hover:text-teal-800 dark:hover:text-teal-400">
                      {`#${tag.tagName} (${tag.relatedPostsCount})`}
                    </a>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  const authors = await getAuthorsAndRelatedPostsCount(locale);
  const tags = await getTagsAndRelatedPostsCount(locale);

  return {
    props: {
      authors,
      tags,
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  };
}
