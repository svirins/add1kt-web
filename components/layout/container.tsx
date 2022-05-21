import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import CustomHead from '@/components/seo/custom-head';
import { ContainerProps } from 'extra-types';

export default function Container(props: ContainerProps) {
  const { children, ...customMeta } = props;
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <CustomHead customMeta={customMeta} contentType="article" />
      <header>
        <Header />
      </header>
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
