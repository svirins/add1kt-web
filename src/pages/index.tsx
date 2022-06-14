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
} from '@/utils/api';

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props'];

export default function Index({ pageData, featuredPosts, total }: Props) {
  const t = useTranslations('Titles');
  return (
    <Container title={pageData.pageTitle}>
      <div className="flex flex-col justify-center items-start max-w-2xl  mx-auto pb-16">
        {pageData && (
          <PageTop
            title={pageData.pageTitle}
            subtitle=""
            pictureUrl={pageData.pagePicture}
            text={pageData.pageText}
          />
        )}
        <div className="relative w-full mb-4">
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

export async function getStaticProps({ locale }: { locale: string }) {
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
