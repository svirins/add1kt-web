import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import CustomHead from '@/components/seo/custom-head';
import { ContainerProps } from 'extra-types';

export default function Container(props: ContainerProps) {
  const { children, type = 'page', ...customMeta } = props;
  return (
      <div className="flex flex-col justify-center px-8">
        <CustomHead customMeta={customMeta} contentType={type} />
        <nav className="flex items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16  text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
          <Header />
        </nav>
        <main
          id="skip"
          className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900"
        >
          {children}
          <Footer />
        </main>
      </div>
  );
}
