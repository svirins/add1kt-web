import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import CustomHead from '@/components/seo/custom-head';
import { ContainerProps } from 'extra-types';

// FIXME: eliminate shift layout
export default function Container(props: ContainerProps) {
  const { children, type = 'page', ...customMeta } = props;
  return (
    <div className="max-w-3xl mx-auto">
      <CustomHead customMeta={customMeta} contentType={type} />
      <header>
        <Header />
      </header>
      <main id="skip" className="flex flex-col justify-center px-8 max-w-3xl">
        {children}
        <Footer />
      </main>
    </div>
  );
}
