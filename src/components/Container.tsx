import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

type ContainerProps = {
  title?: string;
  description?: string;
  ogImage?: string;
  type?: string;
  date?: string;
  children: React.ReactNode;
};

export function Container(props: ContainerProps) {
  const router = useRouter();
  const openGraph = {
    title: props.title ?? "",
    url: `https://www.addict.cf${router.asPath}` ?? "https://www.addict.cf",
    type: props.type ?? "page",
    image: props.ogImage ?? "/og.png",
    description: props.description ?? "",
    images: [
      {
        url: props.ogImage ?? "/og.png",
        alt: props.title ?? "",
      },
    ],
  };
  return (
    <div className="flex flex-col justify-center bg-white text-slate-500 dark:bg-slate-900 dark:text-slate-400 ">
      <NextSeo openGraph={openGraph} />
      <main
        id="skip"
        className="mx-auto flex min-w-fit max-w-2xl flex-col  justify-center bg-white px-6 text-lg text-slate-500 dark:bg-slate-900 dark:text-slate-400 md:px-8"
      >
        <Header />
        {props.children}
        <Footer />
      </main>
    </div>
  );
}
