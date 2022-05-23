import Link from 'next/link';

import { AllAuthorsTagsAndTotalPosts } from '@/lib/api';

import Container from '@/components/layout/container';
import PageTitle from '@/components/misc/page-title';
import { useTranslations } from 'next-intl';

export default function GetAllAuthorsAndTags({ authors, tags }) {
  const t = useTranslations('Titles');
  const sortedAutors = authors.sort(
    (a, b) =>
      b.linkedFrom.postCollection.total - a.linkedFrom.postCollection.total
  );
  const sortedTags = tags.sort(
    (a, b) =>
      b.linkedFrom.postCollection.total - a.linkedFrom.postCollection.total
  );
  return (
    <Container title={t('categories')} type="page">
      <main className="flex flex-col justify-center items-start max-w-3xl w-full mx-auto mb-16">
        <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
          <div className="space-x-2 pt-6 pb-8 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
              {t('authors')}
            </h1>
          </div>
          <div className="flex max-w-lg flex-wrap">
            {sortedAutors.length === 0 && 'No tags found.'}
            {sortedAutors.map((autor) => {
              return (
                <div key={autor} className="mt-2 mb-2 mr-5">
                  <Link
                    href={`/tag/${autor.slug}`}
                    className="mr-3 text-sm font-medium uppercase text-orange-500 hover:text-orange-600 dark:hover:text-orange-400"
                  >
                    {`${autor.name} (${autor.linkedFrom.postCollection.total})`}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
          <div className="space-x-2 pt-6 pb-8 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
              {t('tags')}
            </h1>
          </div>
          <div className="flex max-w-lg flex-wrap">
            {sortedTags.length === 0 && 'No tags found.'}
            {sortedTags.map((tag) => {
              return (
                <div key={tag} className="mt-2 mb-2 mr-5">
                  <Link
                    href={`/tag/${tag.slug}`}
                    className="mr-3 text-sm font-medium uppercase text-orange-500 hover:text-orange-600 dark:hover:text-orange-400"
                  >
                    {`${tag.title} (${tag.linkedFrom.postCollection.total})`}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </Container>
  );
}






















export async function getStaticProps({ locale }) {
  const { authors, tags } = await AllAuthorsTagsAndTotalPosts(locale);
  return {
    props: {
      authors,
      tags,
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}
