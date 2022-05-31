import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Container from '@/components/Container';

import {
  getAuthorsAndRelatedPostsCount,
  getTagsAndRelatedPostsCount
} from '@/lib/api';

export default function GetAllAuthorsAndTags({ authors, tags }) {
  const t = useTranslations('Titles');
  const sortedAutors = authors.sort(
    (a, b) => b.relatedPostsCount - a.relatedPostsCount
  );
  const sortedTags = tags.sort(
    (a, b) => b.relatedPostsCount - a.relatedPostsCount
  );
  return (
    <Container title={t('categories')} type="page">
      <div className="flex flex-col  justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <div className="flex flex-col items-start justify-start divide-y divide-gray-300 dark:divide-gray-500 md:mb-6 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
          <div className="space-x-2 pt-2 pb-4 md:space-y-5">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight sm:leading-10 md:border-r-2 md:pr-6 md:leading-14">
              {t('authors')}
            </h1>
          </div>
          <div className="flex max-w-lg flex-wrap">
            {sortedAutors.length === 0 && 'No tags found.'}
            {sortedAutors.map((author) => {
              return (
                <div key={author} className="mt-2 mb-2 mr-5">
                  <Link href={`/author/${author.authorSlug}`}>
                    <a className="mr-3 text-base font-medium text-teal-600 transition-all delay-100 hover:text-teal-800 dark:hover:text-teal-400">
                      {`${author.authorTitle} (${author.relatedPostsCount})`}
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col items-start justify-start divide-y divide-gray-300 dark:divide-gray-500 mb-6 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
          <div className="space-x-2 pt-2 pb-4 md:space-y-5">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight sm:leading-10 md:border-r-2 md:pr-6 md:leading-14">
              {t('tags')}
            </h1>
          </div>
          <div className="flex max-w-lg flex-wrap">
            {sortedTags.length === 0 && 'No tags found.'}
            {sortedTags.map((tag) => {
              return (
                <div key={tag} className="mt-2 mb-2 mr-5">
                  <Link href={`/tag/${tag.tagSlug}`}>
                    <a className="mr-3 text-base font-medium  text-teal-600 transition-all delay-100 hover:text-teal-800 dark:hover:text-teal-400">
                      {`#${tag.tagTitle} (${tag.relatedPostsCount})`}
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}

export async function getStaticProps({ locale }) {
  const authors = await getAuthorsAndRelatedPostsCount(locale);
  const tags = await getTagsAndRelatedPostsCount(locale);

  return {
    props: {
      authors,
      tags,
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}
