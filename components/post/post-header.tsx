import Authors from '@/components/author/authors';
import Tags from '@/components/tag/tags';
import PostDetails from '@/components/post/post-details';

export default function PostHeader({
  slug,
  date,
  authors,
  tags,
  featured,
  readingTime
}) {
  return (
    <div className="text-sm text-gray-700 dark:text-gray-300 mb-4">
      <PostDetails date={date} readingTime={readingTime} slug={slug} />
      <div className="flex flex-row mb-4 text-sm">
        <Tags tags={tags} featured={featured} />
      </div>
      <div className="flex flex-row mb-4">
        <Authors authors={authors} />
      </div>
    </div>
  );
}
