import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

type ContainerProps = {
  title?: string;
  description?: string;
  ogImage?: string;
  type?: string;
  date?: string;
  children: React.ReactNode;
};

export default function Container(props: ContainerProps) {
  const router = useRouter();

  const openGraph = {
    title: props.title ?? '',
    url: `https://www.addict.cf${router.asPath}` ?? 'https://www.addict.cf',
    type: props.type ?? 'page',
    image: props.ogImage ?? '/og.png',
    description: props.description ?? ''
  };
  return (
    <div className="flex flex-col justify-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 ">
      <NextSeo openGraph={openGraph} />
      <main
        id="skip"
        className="flex flex-col justify-center px-6 md:px-8  min-w-fit max-w-2xl mx-auto text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 text-lg"
      >
        <Header />
        {props.children}
        <Footer />
      </main>
    </div>
  );
}
