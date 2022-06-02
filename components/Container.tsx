import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeadSeo from '@/components/HeadSeo';
import { ContainerProps } from 'extra-types';

export default function Container(props: ContainerProps) {
  const { children, type = 'page', ...customMeta } = props;
  return (
    <div className="flex flex-col justify-center">
      <HeadSeo customMeta={customMeta} contentType={type} />
      <main id="skip" className="flex flex-col justify-center px-8 max-w-2xl mx-auto">
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  );
}
