import { Container } from "@/components/Container";
import { PageTop } from "@/components/PageTop";
import { getPageContent } from "@/utils/api";

export default function About({ pageData }: Props) {
  return (
    <Container title={pageData.pageTitle}>
      <div className="mx-auto flex max-w-2xl flex-col items-start justify-center border-gray-200 pb-16 dark:border-gray-700">
        {pageData && <PageTop title={pageData.pageTitle} subtitle="" text={pageData.pageText} />}
      </div>
    </Container>
  );
}

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"];

export async function getStaticProps({ locale }: { locale: string }) {
  const pageData = await getPageContent(locale, "about");
  return {
    props: {
      pageData,
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  };
}
