import { getFeaturedPosts, getPageContent } from '@/lib/api';
import Config from '@/config/global-config';
import PageTitle from '@/components/misc/page-title';
import Container from '@/components/layout/container';
import PostBody from '@/components/post/post-body';
import CoverImage from '@/components/image/cover-image';

export default function About({ pageData, pagePosts }) {
  return (
    <Container
      title="about"
      // description={}
      // image={ }
      // date={ }
      type="page"
    >
      <main className="flex flex-col justify-center items-start max-w-3xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        {/* <AlgoliaSearch /> */}
        {pageData && (
          <>
            <PageTitle>{pageData.title}</PageTitle>
            <CoverImage
              title={pageData?.title}
              width={pageData.coverImage.width}
              url={pageData.coverImage.url}
              height={pageData.coverImage.height}
            />
            <PostBody content={pageData.body} />
          </>
        )}
      </main>
    </Container>
  );
}

export async function getStaticProps({ locale }) {
  const pagePosts = await getFeaturedPosts(locale);
  const pageData = await getPageContent(locale, Config.routes.aboutSlug);
  return {
    props: {
      pageData,
      pagePosts,
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}
