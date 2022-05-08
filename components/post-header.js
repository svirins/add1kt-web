import Authors from '@/components/authors';
import DateReadingTime from '@/components/date-reading-time';
import CoverImage from '@/components/cover-image';
import PostTitle from '@/components/post-title';
import Tags from '@/components/tags';

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
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Authors authors={authors} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} url={coverImage.url} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Authors authors={authors} />
        </div>
        <div className="mb-6 text-lg">
          <DateReadingTime date={date} readingTime={readingTime} />
        </div>
        <div className="flex flex-row mb-2  flex-wrap">
          <Tags tags={tags} featured={featured} />
        </div>
      </div>
    </>
  );
}
