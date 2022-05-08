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
  featured
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
      <div className="text-lg mb-4">
        <DateComponent dateString={date} />
      </div>
      <div className="flex flex-row">
        {tags &&
          tags.map((tag) => (
            <Tag key={tag.slug} name={tag.title} slug={tag.slug} />
          ))}
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <div className="flex flex-row">
        {featured && <Featured />}
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
