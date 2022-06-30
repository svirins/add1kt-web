import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { TAuthorBase, TPortableText, TTagBase } from "@/typings/schema-types";
import { getDescription } from "@/utils/contentUtils";

type ContainerProps = {
  title: string;
  description?: TPortableText;
  ogImage?: string;
  type?: string;
  date?: string;
  children: React.ReactNode;
  tags?: TTagBase[];
  author?: TAuthorBase;
};

export function Container(props: ContainerProps) {
  const router = useRouter();
  const { locale } = router;
  const description = getDescription(props.description ?? []);
  const articleData =
    props.type === "article"
      ? {
          publishedTime: props.date,
          tags: props.tags ? props.tags.map((tag) => tag.tagName) : [],
          authors: props.author
            ? [`https://${locale === "ru" ? "" : "pl."}addict.cf/author/${props.author.authorSlug}`]
            : [""],
          description,
        }
      : {};
  const seoData = {
    title: props.title,
    description,
    openGraph: {
      title: props.title,
      locale,
      article: articleData,
      url: `https://www.addict.cf${router.asPath}` ?? "https://www.addict.cf",
      type: props.type ?? "page",
      image: props.ogImage ?? "/og.png",
      description,
      images: [
        {
          url: props.ogImage ?? "/og.png",
          alt: props.title ?? "",
        },
      ],
    },
    twitter: {
      cardType: props.ogImage ?? "/og.png",
    },
  };
  return (
    <div className="flex flex-col justify-center bg-white text-slate-600 dark:bg-slate-900 dark:text-slate-300 ">
      <NextSeo {...seoData} />
      <main
        id="skip"
        className="mx-auto flex min-w-fit max-w-2xl flex-col  justify-center bg-white px-6 text-lg text-slate-600 dark:bg-slate-900 dark:text-slate-300 md:px-8"
      >
        <Header />
        {props.children}
        <Footer />
      </main>
    </div>
  );
}
