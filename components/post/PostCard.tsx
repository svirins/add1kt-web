import Link from 'next/link';

import Tags from '@/components/tag/Tags';
import PostMeta from '@/components/post/PostMeta';
import { ResponsiveImage } from '@/components/image/next-sanity-image';

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
    <div>
      <ResponsiveImage alt={title} slug={slug} url={previewImage} />
      <h4 className="w-full mt-4 text-base font-medium  md:text-lg hover:text-teal-600  transition-all delay-100 dark:hover:text-teal-400 ">
        <Link href={`/blog/${slug}`}>
          <a>{title}</a>
        </Link>
      </h4>
      <div className="flex flex-row text-sm  justify-end mb-2">
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
