import { getFeaturedPosts, getPageContent } from '@/lib/api';
import Config from '@/config/global-config';
import MorePosts from '@/components/post/more-posts';
import HomePage from '@/components/page/homepage';
import SectionSeparator from '@/components/misc/section-separator';
import PageTitle from '@/components/misc/page-title';
import Container from '@/components/layout/container';
import MorepostsControls from '@/components/post/moreposts-controls';

export default function ABOUT({ pageData, pagePosts }) {
  return (
    <Container
      // title={ }
      // description={}
      // image={ }
      // date={ }
      type="page"
    >
      <main className="flex flex-col justify-center items-start max-w-3xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <PageTitle>{pageData.title}</PageTitle>
        {pageData && (
          <HomePage
            title={pageData.title}
            coverImage={pageData.coverImage}
            body={pageData.body}
          />
        )}
        <SectionSeparator />
        {pagePosts?.length > 0 && (
          <MorePosts isHomePage={true} posts={pagePosts} />
        )}
        <MorepostsControls />
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
