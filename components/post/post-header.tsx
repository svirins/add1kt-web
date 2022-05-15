import Authors from '@/components/author/authors';
import PublishedDate from '@/components/date/published-date'
import ReadingTime from '@/components/date/reading-time';
import ViewCounter from '@/components/misc/view-counter';
import Tags from '@/components/tag/tags';

export default function PostHeader({
  slug,
  date,
  authors,
  tags,
  featured,
  readingTime
}) {
  return (
    <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
      <div className="flex items-center">
        <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
          <Authors authors={authors} />
          {' / '}
          <PublishedDate date={date} />
        </p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
          <ReadingTime readingTime={readingTime} />
          {` • `}
          <ViewCounter slug={slug} />
        </p>
        <Tags tags={tags} featured={featured} />
    </div>
  );
}
