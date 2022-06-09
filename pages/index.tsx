import { useTranslations } from 'next-intl';

import { Container } from '@/components/Container';
import { MorepostsControls } from '@/components/MorePostsControls';
import { PageTop } from '@/components/PageTop';
import { PostsGrid } from '@/components/PostsGrid';
import { Search } from '@/components/Search';
import { SectionSeparator } from '@/components/SectionSeparator';
import { Subtitle } from '@/components/Subtitle';
import {
  getFeaturedPosts,
  getPageContent,
  getTotalPostsNumber,
} from '@/lib/api';

export default function Index({ pageData, featuredPosts, total }) {
  const t = useTranslations('Titles');
  return (
    <Container title={pageData.pageTitle}>
      <div className="mx-auto flex max-w-2xl flex-col items-start  justify-center pb-16">
        {pageData && (
          <PageTop
            title={pageData.pageTitle}
            subtitle=""
            pictureUrl={pageData.pagePicture}
            text={pageData.pageText}
          />
        )}
        <div className="relative mb-4 w-full">
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
      total,
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  };
}
