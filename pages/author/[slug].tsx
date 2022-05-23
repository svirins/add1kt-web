import { useTranslations } from 'next-intl';

import {
  getAllAuthors,
  getAuthorAndRelatedPosts,
  getAuthorIdBySlug
} from '@/lib/api';

import Subtitle from '@/components/misc/subtitle';
import Container from '@/components/layout/container';
import MorePosts from '@/components/post/more-posts';
import SectionSeparator from '@/components/misc/section-separator';
import PageTitle from '@/components/misc/page-title';
import Avatar from '@/components/author/avatar';

export default function Author({ author, relatedPosts }) {
  const t = useTranslations('Titles');
  // FIXME: related posts don't displaqy, when change language

  return (
    <Container type="page" title={author.name}>
      <main className="flex flex-col justify-center items-start max-w-3xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <PageTitle>{author.name}</PageTitle>
        <Avatar
          name={author.name}
          width={192}
          height={192}
          picture={author.picture}
        />
        <p>{author.subtitle}</p>
        <SectionSeparator />
        <Subtitle>{t('author_related_articles')}{author.name}</Subtitle>
        {relatedPosts?.length > 0 && <MorePosts posts={relatedPosts} />}
      </main>
    </Container>
  );
}

export async function getStaticPaths({ locales }) {
  const allAuthors = await getAllAuthors();
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
  const id = await getAuthorIdBySlug(params.slug, locale);
  const data = await getAuthorAndRelatedPosts(id, locale);
  return {
    props: {
      author: data?.author ?? null,
      relatedPosts: data?.relatedPosts ?? null,
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}
