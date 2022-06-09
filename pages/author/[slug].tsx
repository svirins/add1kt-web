import { useTranslations } from 'next-intl';

import { Container } from '@/components/Container';
import { PageTop } from '@/components/PageTop';
import { PostsGrid } from '@/components/PostsGrid';
import { SectionSeparator } from '@/components/SectionSeparator';
import { Subtitle } from '@/components/Subtitle';
import { getAllAuthorSlugs, getAuthorAndRelatedPosts } from '@/lib/api';

export default function Author({ author, authorPosts }) {
  const t = useTranslations('Titles');
  return (
    <Container title={author.authorTitle} ogImage={author.authorPicture}>
      <div className="mx-auto flex max-w-2xl flex-col items-start justify-center border-gray-200 pb-16 dark:border-gray-700">
        {author && (
          <>
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
          </>
        )}
        {authorPosts?.length > 0 && <PostsGrid posts={authorPosts} />}
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
          slug: `/author/${author.slug}`,
        },
        locale,
      }))
    )
    .flat();
  return {
    paths: allPathsWithLocales,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params, locale }) {
  const { authorPosts, ...author } = await getAuthorAndRelatedPosts(
    locale,
    params.slug.replace(/\/$/, '').split('/').pop()
  );
  return {
    props: {
      author,
      authorPosts,
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}
