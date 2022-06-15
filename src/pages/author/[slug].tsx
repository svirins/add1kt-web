import { useTranslations } from "next-intl";
import type { ParsedUrlQuery } from "querystring";

import { Container } from "@/components/Container";
import { PageTop } from "@/components/PageTop";
import { PostsGrid } from "@/components/PostsGrid";
import { SectionSeparator } from "@/components/SectionSeparator";
import { Subtitle } from "@/components/Subtitle";
import { getAllAuthorSlugs, getAuthorAndRelatedPosts } from "@/utils/api";

interface IParams extends ParsedUrlQuery {
  slug: string;
}
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"];

export default function Author({ author, authorPosts }: Props) {
  const t = useTranslations("Titles");
  return (
    <Container title={author.authorName} ogImage={author.authorPicture}>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        {author && (
          <>
            <PageTop
              title={author.authorName}
              subtitle=""
              socials={author.authorSocials}
              pictureUrl={author.authorPicture}
              text={author.authorBio}
            />
            <SectionSeparator />
            <Subtitle>
              {`${t("author_related_articles")}${author.authorName}`}
            </Subtitle>
          </>
        )}
        {authorPosts && authorPosts.length > 0 && (
          <PostsGrid posts={authorPosts} />
        )}
      </div>
    </Container>
  );
}

export async function getStaticPaths({ locales }: { locales: string[] }) {
  const allAuthors = await getAllAuthorSlugs();
  const allPathsWithLocales = allAuthors
    .map(({ slug }) =>
      locales.map((locale) => ({
        params: {
          slug: `/author/${slug}`,
        },
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
  const { authorPosts, ...author } = await getAuthorAndRelatedPosts(
    locale,
    params.slug.replace(/\/$/, "").split("/").pop() as string
  );
  return {
    props: {
      author,
      authorPosts,
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}
