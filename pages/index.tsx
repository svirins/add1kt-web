import { useTranslations } from 'next-intl';

import {
  getFeaturedPosts,
  getPageContent,
  getTotalPostsNumber
} from '@/lib/api';

import Search from '@/components/Search';
import PostsGrid from '@/components/PostsGrid';
import SectionSeparator from '@/components/SectionSeparator';
import Container from '@/components/Container';
import MorepostsControls from '@/components/MorePostsControls';
import PageTop from '@/components/PageTop';
import Subtitle from '@/components/Subtitle';

export default function Index({ pageData, featuredPosts, total }) {
  const t = useTranslations('Titles');
  return (
    <Container title={pageData.pageTitle} type="page">
      <div className="flex flex-col justify-center items-start max-w-2xl  mx-auto pb-16">
        {pageData && (
          <PageTop
            title={pageData.pageTitle}
            subtitle=""
            pictureUrl={pageData.pagePicture}
            text={pageData.pageText}
          />
        )}
        <div id="autocomplete" className="relative w-full mb-4">
          <Search />
        </div>
        <SectionSeparator />
        <Subtitle>{t('featured_posts')}</Subtitle>
        {featuredPosts?.length > 0 && <PostsGrid posts={featuredPosts} />}
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
      total: total,
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}
