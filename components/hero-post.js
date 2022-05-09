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
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage
          title={title}
          slug={slug}
          url={coverImage.url}
          width={coverImage.width}
          height={coverImage.height}
        />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={`/posts/${slug}`}>
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
          <div className="mb-2 text-lg flex flex-row justify-between items-center">
            <DateReadingTime date={date} readingTime={readingTime} />
          </div>
          <div className="flex flex-row mb-2  flex-wrap">
            <Tags tags={tags} featured={featured} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <div className="flex flex-row">
            <Authors authors={authors} />
          </div>
        </div>
      </div>
    </section>
  );
}
