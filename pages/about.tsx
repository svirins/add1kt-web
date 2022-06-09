import { Container } from '@/components/Container';
import { PageTop } from '@/components/PageTop';
import { getPageContent } from '@/lib/api';

export default function About({ pageData }) {
  return (
    <Container title={pageData.pageTitle}>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        {pageData && (
          <PageTop
            title={pageData.pageTitle}
            subtitle=""
            text={pageData.pageText}
          />
        )}
      </div>
    </Container>
  );
}

export async function getStaticProps({ locale }) {
  const pageData = await getPageContent(locale, 'about');
  return {
    props: {
      pageData,
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}
