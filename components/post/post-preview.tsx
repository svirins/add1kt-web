import Link from 'next/link';

import Authors from '@/components/author/authors';
import Tags from '@/components/tag/tags';
import DateReadingTime from '@/components/date-reading-time';
import ShimmerImage from '@/components/cover-image';

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
        <ShimmerImage
          title={title}
          slug={slug}
          url={coverImage.url}
          width={coverImage.width}
          height={coverImage.height}
        />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/blog/${slug}`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="mb-2 text-lg flex flex-row justify-between items-end">
        <DateReadingTime date={date} readingTime={readingTime} />
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
