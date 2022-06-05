import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeadSeo from '@/components/HeadSeo';
import { ContainerProps } from 'extra-types';

export default function Container(props: ContainerProps) {
  const { children, type = 'page', ...customMeta } = props;
  return (
    <div className="flex flex-col justify-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 ">
      <HeadSeo customMeta={customMeta} contentType={type} />
      <main
        id="skip"
        className="flex flex-col justify-center px-6 md:px-8  min-w-fit max-w-2xl mx-auto text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 text-lg"
      >
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  );
}
