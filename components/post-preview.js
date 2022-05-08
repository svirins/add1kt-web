import Link from 'next/link';
import Avatar from '@/components/avatar';
import Tag from '@/components/tag';
import DateComponent from '@/components/date';
import CoverImage from '@/components/cover-image';
import Featured from '@/components/featured';

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
      <div className="text-lg mb-2 flex flex-row">
        <DateComponent dateString={date} />
        <div className="italic  inline-flex items-center">{`${readingTime} мин. чтения`}</div>
      </div>
      <div className="flex flex-row mb-2">
        {featured && <Featured />}
        {tags &&
          tags.map((tag) => (
            <Tag key={tag.slug} name={tag.title} slug={tag.slug} />
          ))}
      </div>
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
  );
}
