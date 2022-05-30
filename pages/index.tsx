import { useTranslations } from 'next-intl';

import {
  getFeaturedPosts,
  getPageContent,
  getTotalPostsNumber
} from '@/lib/api';

import Search from '@/components/search/search';
import MorePosts from '@/components/post/more-posts';
import SectionSeparator from '@/components/misc/section-separator';
import Container from '@/components/layout/container';
import MorepostsControls from '@/components/post/moreposts-controls';
import PageTop from '@/components/layout/page-top';
import Subtitle from '@/components/misc/subtitle';

export default function Index({ pageData, featuredPosts, total }) {
  const t = useTranslations('Titles');
  return (
    <Container title={pageData.pageTitle} type="page">
      <main className="flex flex-col justify-center items-start max-w-3xl mx-auto pb-16">
        <div id="autocomplete" className="relative w-full">
          <Search />
        </div>
        <PageTop
          title={pageData.pageTitle}
          subtitle=""
          pictureUrl={pageData.pagePicture}
          text={pageData.pageText}
        />
        <SectionSeparator />
        <Subtitle>{t('featured_posts')}</Subtitle>
        {featuredPosts?.length > 0 && <MorePosts posts={featuredPosts} />}
        <MorepostsControls isDisabled={total < 6} />
      </main>
    </Container>
  );
}

export async function getStaticProps({ locale }) {
  const featuredPosts = await getFeaturedPosts(locale);
  const pageData = await getPageContent(locale, '/');
  const total = await getTotalPostsNumber();
  return {
    props: {
      pageData,
      featuredPosts,
      total,
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}
