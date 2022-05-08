import Link from 'next/link';
import Avatar from '@/components/avatar';
import Tag from '@/components/tag';
import DateComponent from '@/components/date';
import CoverImage from '@/components/cover-image';
import Featured from '@/components/featured';

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
        <CoverImage title={title} slug={slug} url={coverImage.url} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={`/posts/${slug}`}>
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateComponent dateString={date} />
          </div>
          <div className="flex flex-row">
            {featured && <Featured />}
            {tags &&
              tags.map((tag) => (
                <Tag key={tag.slug} name={tag.name} slug={tag.slug} />
              ))}
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <div className="flex flex-row">
            {authors &&
              authors.map((author) => (
                <Avatar
                  key={author.slug}
                  name={author.name}
                  picture={author.picture}
                  slug={author.slug}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
