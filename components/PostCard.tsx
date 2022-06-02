import Link from 'next/link';

import { truncate } from '@/lib/content-utils';
import Tags from '@/components/Tags';
import PostMeta from '@/components/PostMeta';
import ResponsiveImage from '@/components/ResponsiveImage';

export default function PostCard({
  title,
  previewImage,
  date,
  author,
  tags,
  slug,
  readingTime
}) {
  return (
    <div className="my-4 md:my-0">
      <ResponsiveImage alt={title} slug={slug} url={previewImage} />
      <h4 className="w-full mt-4  font-medium  text-lg hover:text-teal-600  transition-all delay-100 dark:hover:text-teal-400 ">
        <Link href={`/blog/${slug}`}>
          <a>{truncate(title)}</a>
        </Link>
      </h4>
      <div className="flex flex-row text-sm  justify-end">
        <Tags tags={tags} />
      </div>
      <div className="flex flex-row ">
        <PostMeta
          date={date}
          readingTime={readingTime == 0 ? 1 : readingTime}
          author={author}
        />
      </div>
    </div>
  );
}
