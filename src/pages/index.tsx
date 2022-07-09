/* eslint-disable prettier/prettier */
import { useTranslations } from "next-intl";

import { Container } from "@/components/Container";
import { MorepostsControls } from "@/components/MorePostsControls";
import { PageTop } from "@/components/PageTop";
import { PostsGrid } from "@/components/PostsGrid";
import { Search } from "@/components/Search";
import { SectionSeparator } from "@/components/SectionSeparator";
import { Subtitle } from "@/components/Subtitle";
import {
  getFeaturedPosts,
  getPageContent,
  getTotalPostsNumber,
} from "@/utils/api";

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"];

export default function Index({ pageData, featuredPosts, total }: Props) {
  const t = useTranslations("Titles");
  return (
    <Container
      title={pageData.pageTitle}
      ogImage={pageData.pagePicture}
      description={pageData.pageText}
    >
      <div className="mx-auto flex max-w-2xl flex-col items-start  justify-center pb-16">
        {pageData && (
          <PageTop
            title={pageData.pageTitle}
            subtitle=""
            pictureUrl={pageData.pagePicture}
            text={pageData.pageText}
          />
        )}
        <div className="relative mb-4 w-full">
          <Search />
        </div>
        <SectionSeparator />
        <Subtitle>{t("featured_posts")}</Subtitle>
        {featuredPosts?.length > 0 && <PostsGrid posts={featuredPosts} />}
        <MorepostsControls isDisabled={total < 6} />
      </div>
    </Container>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  const data = await getFeaturedPosts(locale);
  const featuredPosts = data
    // eslint-disable-next-line no-underscore-dangle
    .sort((a, b) => b._updatedAt - a._updatedAt)
    .slice(0, 6);
  const pageData = await getPageContent(locale, "/");
  const total = await getTotalPostsNumber();
  return {
    props: {
      pageData,
      featuredPosts,
      total,
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  };
}
