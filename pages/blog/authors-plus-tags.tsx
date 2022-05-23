import Link from 'next/link';

import { AllAuthorsTagsAndTotalPosts } from '@/lib/api';

import Container from '@/components/layout/container';
import PageTitle from '@/components/misc/page-title';
import Avatar from '@/components/author/avatar';
import { useTranslations } from 'next-intl';

export default function GetAllAuthorsAndTags({ authors, tags }) {
  const t = useTranslations('Titles');
  console.log(authors, tags);
  return (
    <Container title={t('authors+tags')} type="page">
      <main className="flex flex-col justify-center items-start max-w-3xl w-full mx-auto mb-16">
        <PageTitle>{t('authors+tags')}</PageTitle>
        {authors &&
          authors.map(author => (
            <Link href={`/blog/tag/${author.slug}`} key={author.slug}>
              <a className="mr-2 text-sm items-center font-base leading-sm  px-1  border-solid  bg-orange-200 hover:bg-orange-300 text-orange-700 rounded-lg">
                {`${author.name} ${author.linkedFrom.postCollection.total}`}
              </a>
            </Link>

          ))}
        {tags &&
          tags.map(tag => (
            <Link href={`/blog/tag/${tag.slug}`} key={tag.slug}>
              <a className="mr-2 text-sm items-center font-base leading-sm  px-1  border-solid  bg-orange-200 hover:bg-orange-300 text-orange-700 rounded-lg">
                {`${tag.title} ${tag.linkedFrom.postCollection.total}`}
              </a>
            </Link>
          ))}
      </main>
    </Container>
  );
}

export async function getStaticProps({ locale }) {
  const { authors, tags } = await AllAuthorsTagsAndTotalPosts(locale);
  console.log(authors, tags);

  return {
    props: {
      authors,
      tags,
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}
