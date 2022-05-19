import { getFeaturedPosts, getPageContent } from '@/lib/api';
import Config from '@/config/global-config';
import Search from '@/components/search/search';
import { useTranslations } from 'next-intl';
import MorePosts from '@/components/post/more-posts';
import SectionSeparator from '@/components/misc/section-separator';
import PageTitle from '@/components/misc/page-title';
import Container from '@/components/layout/container';
import MorepostsControls from '@/components/post/moreposts-controls';
import PostBody from '@/components/post/post-body';
import CoverImage from '@/components/image/cover-image';

export default function Index({ pageData, pagePosts }) {
  console.log(pageData.imageData);
  const t = useTranslations('Post');
  return (
    <Container
      title={pageData.title}
      // description={}
      // image={ }
      // date={ }
      type="page"
    >
      <main className="flex flex-col justify-center items-start max-w-3xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <div id="autocomplete" className="relative w-full mb-4">
          <Search />
        </div>
        {pageData && (
          <>
            <PageTitle>{pageData.title}</PageTitle>
            <CoverImage
              title={pageData.title}
              width={pageData.coverImage.width}
              url={pageData.coverImage.url}
              height={pageData.coverImage.height}
            />
            <PostBody content={pageData.body} />
            <SectionSeparator />
          </>
        )}
        {pagePosts?.length > 0 && (
          <MorePosts posts={pagePosts} title={t('featured_posts')} />
        )}
        <MorepostsControls />
      </main>
    </Container>
  );
}

export async function getStaticProps({ locale }) {
  const pagePosts = await getFeaturedPosts(locale);
  const pageData = await getPageContent(locale, Config.routes.homepageSlug);
  return {
    props: {
      pageData,
      pagePosts,
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}
