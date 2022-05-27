import { getPageContent } from '@/lib/api';
import PageTitle from '@/components/misc/page-title';
import Container from '@/components/layout/container';
import PostBody from '@/components/post/post-body';

export default function About({ pageData }) {
  return (
    <Container title={pageData.title} type="page">
      <main className="flex flex-col justify-center items-start max-w-3xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        {/* <AlgoliaSearch /> */}
        {pageData && (
          <>
            <PageTitle>{pageData.title}</PageTitle>
            <PostBody content={pageData.text} />
          </>
        )}
      </main>
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
