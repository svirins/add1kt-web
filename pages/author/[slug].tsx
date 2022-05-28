import { useTranslations } from 'next-intl';

import { getAllAuthorSlugs, getAuthorAndRelatedPosts } from '@/lib/api';

import Avatar from '@/components/author/avatar';
import Container from '@/components/layout/container';
import PageTitle from '@/components/misc/page-title';
import SectionSeparator from '@/components/misc/section-separator';
import Subtitle from '@/components/misc/subtitle';
import MorePosts from '@/components/post/more-posts';

export default function Author({ author, relatedPosts }) {
  const t = useTranslations('Titles');
  console.log(author.social);
  return (
    <Container type="page" title={author.name}>
      <main className="flex flex-col justify-center items-start max-w-3xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <PageTitle>{author.name}</PageTitle>
        <p>{author.description}</p>
        <Avatar
          name={author.name}
          width={192}
          height={192}
          picture={author.picture}
        />
        <p>{author.subtitle}</p>
        <SectionSeparator />
        <Subtitle>
          {t('author_related_articles')}
          {author.name}
        </Subtitle>
        {relatedPosts?.length > 0 && <MorePosts posts={relatedPosts} />}
      </main>
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
  const data = await getAuthorAndRelatedPosts(locale, params.slug);
  return {
    props: {
      author: data?.author ?? null,
      relatedPosts: data?.relatedPosts ?? null,
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}
