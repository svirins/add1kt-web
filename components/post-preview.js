import Link from 'next/link';
import Authors from '@/components/authors';
import Tags from '@/components/tags';
import DateReadingTime from '@/components/date-reading-time';
import CoverImage from '@/components/cover-image';

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
        <CoverImage title={title} slug={slug} url={coverImage.url} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <DateReadingTime date={date} readingTime={readingTime} />
      <Tags tags={tags} featured={featured} />
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <Authors authors={authors} />
    </div>
  );
}
