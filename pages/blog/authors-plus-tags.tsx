import { AllAuthorsTagsAndTotalPosts } from '@/lib/api';
// import { AllAuthors } from '@/components/author/all-authors';
// import { AllTags } from '@/components/tag/all-tags';

import Container from '@/components/layout/container';
import PageTitle from '@/components/misc/page-title';
import SectionSeparator from '@/components/misc/section-separator';
import { useTranslations } from 'next-intl';

export default function GetAllAuthorsAndTags({ authors, tags }) {
  const t = useTranslations('Titles');
  console.log(authors, tags);
  return (
    <Container
      title={t('authors+tags')}
      // description={}
      // image={ }
      // date={ }
      type="page"
    >
      <main className="flex flex-col justify-center items-start max-w-3xl w-full mx-auto mb-16">
        <PageTitle>{t('authors+tags')}</PageTitle>
        {/* {authors && <AllAuthors />}
        {tags && <AllTags />} */}
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
