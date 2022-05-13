import Alert from '@/components/layout/alert';
import Footer from '@/components/layout/footer';
import Meta from '@/components/meta';

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
