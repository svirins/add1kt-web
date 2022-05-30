import { useTranslations } from 'next-intl';

import { getAllAuthorSlugs, getAuthorAndRelatedPosts } from '@/lib/api';

import Container from '@/components/layout/container';
import SectionSeparator from '@/components/misc/section-separator';
import Subtitle from '@/components/misc/subtitle';
import MorePosts from '@/components/post/more-posts';
import PageTop from '@/components/layout/page-top';

export default function Author({ author, authorPosts }) {
  const t = useTranslations('Titles');
  return (
    <Container type="page" title={author.authorTitle}>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <PageTop
          title={author.authorTitle}
          subtitle=""
          socials={author.authorSocials}
          pictureUrl={author.authorPicture}
          text={author.authorBio}
        />
        <SectionSeparator />
        <Subtitle>
          {t('author_related_articles')}
          {author.authorTitle}
        </Subtitle>
        {authorPosts && <MorePosts posts={authorPosts} />}
      </div>
    </Container>
  );
}

export async function getStaticPaths({ locales }) {
  const allAuthors = await getAllAuthorSlugs();
  const allPathsWithLocales = allAuthors
    .map((author) =>
      locales.map((locale) => ({
        params: {
          slug: `/author/${author.slug}`
        },
        locale: locale
      }))
    )
    .flat();
  return {
    paths: allPathsWithLocales,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params, locale }) {
  const { authorPosts, ...author } = await getAuthorAndRelatedPosts(
    locale,
    params.slug
  );
  return {
    props: {
      author,
      authorPosts,
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}
