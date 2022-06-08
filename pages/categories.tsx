import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Container } from '@/components/Container';
import {
  getAuthorsAndRelatedPostsCount,
  getTagsAndRelatedPostsCount,
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
    <Container title={t('categories')}>
      <div className="mx-auto flex  min-h-screen max-w-2xl flex-col items-start justify-center border-gray-200 pb-16 dark:border-gray-700">
        <div className="flex flex-col items-start justify-start divide-y divide-gray-300 dark:divide-gray-500 md:mb-6 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
          <div className="space-x-2 pt-2 pb-4 md:space-y-5">
            <h1 className="md:leading-14 text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-200 sm:leading-10 md:border-r-2  md:pr-6 md:text-5xl">
              {t('authors')}
            </h1>
          </div>
          <div className="flex max-w-lg flex-wrap">
            {sortedAutors?.length > 0 &&
              sortedAutors.map((author) => {
                return (
                  <div key={author} className="my-2 mr-5">
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
        <div className="mb-6 flex flex-col items-start justify-start divide-y divide-gray-300 dark:divide-gray-500 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
          <div className="space-x-2 pt-2 pb-4 md:space-y-5">
            <h1 className="md:leading-14 text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-200 sm:leading-10 md:border-r-2  md:pr-6 md:text-5xl">
              {t('tags')}
            </h1>
          </div>
          <div className="flex max-w-lg flex-wrap">
            {sortedTags?.length > 0 &&
              sortedTags.map((tag) => {
                return (
                  <div key={tag} className="my-2 mr-5">
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
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  };
}
