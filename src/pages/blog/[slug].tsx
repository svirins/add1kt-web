import { useTranslations } from "next-intl";
import type { ParsedUrlQuery } from "querystring";

import { Container } from "@/components/Container";
import { PostBody } from "@/components/PostBody";
import { PostMeta } from "@/components/PostMeta";
import { PostsGrid } from "@/components/PostsGrid";
import { SanityImage } from "@/components/SanityImage";
import { SectionSeparator } from "@/components/SectionSeparator";
import { Subtitle } from "@/components/Subtitle";
import { Tags } from "@/components/Tags";
import { getAllPostSlugs, getPostAndRelatedPosts } from "@/utils/api";

interface IParams extends ParsedUrlQuery {
  slug: string;
}
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"];

export default function Post({ post, relatedPosts }: Props) {
  const t = useTranslations("Titles");
  if (!post || relatedPosts?.length === 0) {
    return <p>no data</p>;
  }
  return (
    <Container
      title={post.postTitle}
      ogImage={post.postImageUrl}
      date={post.postDate}
      type="article"
      description={post.postText}
      tags={post.tags}
      author={post.author}
    >
      <div className="mx-auto flex max-w-2xl flex-col items-start justify-center pb-16">
        <div className="flex flex-col">
          <h1 className="gradient-header text-3xl font-bold tracking-tight md:text-5xl">
            {post.postTitle}
          </h1>
          <div className="mb-2 flex flex-row justify-end py-2 text-sm">
            <Tags tags={post.tags} />
          </div>
          <SanityImage alt={post.postTitle} url={post.postImageUrl} />

          <div className="mt-4 mb-6 flex flex-row">
            <PostMeta date={post.postDate} readingTime={post.readingTime} author={post.author} />
          </div>
        </div>
        <PostBody text={post.postText} />
        <SectionSeparator />
        <Subtitle>{t("related_posts")}</Subtitle>
        {relatedPosts && <PostsGrid posts={relatedPosts} />}
      </div>
    </Container>
  );
}

export async function getStaticPaths({ locales }: { locales: string[] }) {
  const allPosts = await getAllPostSlugs();
  const allPathsWithLocales = allPosts
    .map(({ slug }) =>
      locales.map((locale) => ({
        params: { slug: `/blog/${slug}` },
        locale,
      }))
    )
    .flat();
  return {
    paths: allPathsWithLocales,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params, locale }: { params: IParams; locale: string }) {
  const { relatedPosts, ...post } = await getPostAndRelatedPosts(
    locale,
    params.slug.replace(/\/$/, "").split("/").pop() as string
  );
  return {
    props: {
      post,
      relatedPosts,
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}
