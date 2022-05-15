import Link from 'next/link';

import Authors from '@/components/author/authors';
import Tags from '@/components/tag/tags';
import PostDetails from '@/components/post/post-details';
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
      <h4 className="w-full mb-2 text-lg font-medium text-gray-900 md:text-xl dark:text-gray-100">
        <Link href={`/blog/${slug}`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h4>
      <div className="flex flex-row text-sm text-gray-700 dark:text-gray-300 mb-4">
        <PostDetails date={date} readingTime={readingTime} slug={slug} />
      </div>
      <div className="flex flex-row mb-4 text-sm">
        <Tags tags={tags} featured={featured} />
      </div>
      <div className="flex flex-row mb-4">
        <Authors authors={authors} />
      </div>
      <CoverImage
        title={title}
        slug={slug}
        url={coverImage.url}
        width={coverImage.width}
        height={coverImage.height}
      />
      <p className="w-full mt-4 prose dark:prose-dark max-w-none">{excerpt}</p>
    </div>
  );
}
