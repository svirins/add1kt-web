import { getFeaturedPosts, getPageContent } from '@/lib/api';
import Config from '@/config/global-config';
import { useTranslations } from 'next-intl';
import Search from '@/components/search/search';
import MorePosts from '@/components/post/more-posts';
import SectionSeparator from '@/components/misc/section-separator';
import PageTitle from '@/components/misc/page-title';
import Container from '@/components/layout/container';
import MorepostsControls from '@/components/post/moreposts-controls';
import PostBody from '@/components/post/post-body';
import CoverImage from '@/components/image/cover-image';

export default function Index({ pageData, pagePosts }) {
  const t = useTranslations('Titles');
  return (
    <Container title={pageData.title} type="page">
      <main className="flex flex-col justify-center items-start max-w-3xl mx-auto pb-16">
        <div id="autocomplete" className="relative w-full mb-4">
          <Search />
        </div>
        {pageData && (
          <>
            <PageTitle>{pageData.title}</PageTitle>
            <PostBody content={pageData.body} />
          </>
        )}
        {pagePosts?.length > 0 && (
          <MorePosts posts={pagePosts} subtitle={t('featured_posts')} />
        )}
        <SectionSeparator />
        <MorepostsControls />
      </main>
    </Container>
  );
}

export async function getStaticProps({ locale }) {
  const pagePosts = await getFeaturedPosts(locale);
  const pageData = await getPageContent(locale, '/');
  return {
    props: {
      pageData,
      pagePosts,
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}
