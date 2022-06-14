import { Container } from '@/components/Container';
import { PageTop } from '@/components/PageTop';
import { getPageContent } from '@/utils/api';

export default function About({ pageData }: Props) {
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

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props'];

export async function getStaticProps({ locale }: { locale: string }) {
  const pageData = await getPageContent(locale, 'about');
  return {
    props: {
      pageData,
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  };
}
