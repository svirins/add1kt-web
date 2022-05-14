import Authors from '@/components/author/authors';
import DateReadingTime from '@/components/date/date-reading-time';
import CoverImage from '@/components/image/cover-image';
import PageTitle from '@/components/misc/page-title';
import Tags from '@/components/tag/tags';

export default function PostHeader({
  title,
  coverImage,
  date,
  authors,
  tags,
  featured,
  readingTime
}) {
  return (
    <>
      <PageTitle>{title}</PageTitle>
      <div className="mb-8 md:mb-16">
          <CoverImage
            title={title}
            url={coverImage.url}
            width={coverImage.width}
            height={coverImage.height}
          />
        </div>
        <div className="hidden md:block md:mb-12">
          <Authors authors={authors} />
        </div>
        <div>
          <div className="block md:hidden mb-6">
            <Authors authors={authors} />
          </div>
          <div className="mb-6 text-lg  flex flex-row justify-between items-end">
            <DateReadingTime date={date} readingTime={readingTime} />
          </div>
          <div className="flex flex-row mb-2  flex-wrap">
            <Tags tags={tags} featured={featured} />
          </div>
        </div>
    </>
  );
}
