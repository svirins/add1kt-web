import Link from 'next/link';
import Authors from '@/components/authors';
import Tags from '@/components/tags';
import DateReadingTime from '@/components/date-reading-time';
import CoverImage from '@/components/cover-image';

export default function HeroPost({
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
  console.log('tags', tags);
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} slug={slug} url={coverImage.url} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={`/posts/${slug}`}>
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
          <DateReadingTime date={date} readingTime={readingTime} />
          <Tags tags={tags} featured={featured} />
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <Authors authors={authors} />
        </div>
      </div>
    </section>
  );
}
