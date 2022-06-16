import { useTranslations } from "next-intl";
import type { ParsedUrlQuery } from "querystring";

import { Container } from "@/components/Container";
import { PageTop } from "@/components/PageTop";
import { PostsGrid } from "@/components/PostsGrid";
import { SectionSeparator } from "@/components/SectionSeparator";
import { Subtitle } from "@/components/Subtitle";
import { getAllTagSlugs, getTagAndRelatedPosts } from "@/utils/api";

interface IParams extends ParsedUrlQuery {
  slug: string;
}
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"];

export default function Tag({ tag, sameTagPosts }: Props) {
  const t = useTranslations("Titles");
  return (
    <Container title={tag.tagName} ogImage={tag.tagPicture}>
      <div className="mx-auto flex max-w-2xl flex-col items-start justify-center pb-16">
        {tag && (
          <>
            <PageTop
              title={tag.tagName}
              subtitle=""
              pictureUrl={tag.tagPicture}
              text={tag.tagText}
            />
            <SectionSeparator />
            <Subtitle>
              {`${t("tag_related_articles")}
              "${tag.tagName.toLowerCase()}"`}
            </Subtitle>
          </>
        )}
        {sameTagPosts && sameTagPosts?.length > 0 && (
          <PostsGrid posts={sameTagPosts} />
        )}
      </div>
    </Container>
  );
}

export async function getStaticPaths({ locales }: { locales: string[] }) {
  const allTags = await getAllTagSlugs();
  const allPathsWithLocales = allTags
    .map(({ slug }) =>
      locales.map((locale) => ({
        params: {
          slug: `/tag/${slug}`,
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
  const { sameTagPosts, ...tag } = await getTagAndRelatedPosts(
    locale,
    params.slug.replace(/\/$/, "").split("/").pop() as string
  );
  return {
    props: {
      tag,
      sameTagPosts,
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}
