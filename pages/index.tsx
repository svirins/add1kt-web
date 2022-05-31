import { useTranslations } from 'next-intl';

import {
  getFeaturedPosts,
  getPageContent,
  getTotalPostsNumber
} from '@/lib/api';

import Search from '@/components/search/Search';
import MorePosts from '@/components/post/MorePosts';
import SectionSeparator from '@/components/misc/SectionSeparator';
import Container from '@/components/layout/Container';
import MorepostsControls from '@/components/post/MorePostsControls';
import PageTop from '@/components/layout/PageTop';
import Subtitle from '@/components/misc/Subtitle';

export default function Index({ pageData, featuredPosts, total }) {
  const t = useTranslations('Titles');
  return (
    <Container title={pageData.pageTitle} type="page">
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
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
      </div>
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
