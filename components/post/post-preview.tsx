import Link from 'next/link';

import Authors from '@/components/author/authors';
import Tags from '@/components/tag/tags';
import ReadingTime from '@/components/date/reading-time';
import PublishedDate from '@/components/date/published-date'
import CoverImage from '@/components/image/cover-image';

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  authors,
  tags,
  slug,
  featured,
  readingTime
}) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage
          title={title}
          slug={slug}
          url={coverImage.url}
          width={coverImage.width}
          height={coverImage.height}
        />
      </div>
      <h4 className="w-full mb-2 text-lg font-medium text-gray-900 md:text-xl dark:text-gray-100">
        <Link href={`/blog/${slug}`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h4>
      <div className="ml-2 text-sm text-gray-700 dark:text-gray-300">
        <PublishedDate date={date} />
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
        <ReadingTime readingTime={readingTime} />
      </div>
      <div className="flex flex-row mb-2">
        <Tags tags={tags} featured={featured} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <div className="flex flex-row">
        <Authors authors={authors} />
      </div>
    </div>
  );
}
