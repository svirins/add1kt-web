import Link from 'next/link';

import { PostMeta } from '@/components/PostMeta';
import { SanityImage } from '@/components/SanityImage';
import { Tags } from '@/components/Tags';
import { globalConfig } from '@/config/global.config';
import { truncate } from '@/lib/contentUtils';

export function PostCard({
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
      <SanityImage
        slug={slug}
        alt={title}
        url={previewImage}
        width={globalConfig.images.defaultPostPreviewImageWidth}
        height={globalConfig.images.defaultPostImagePreviewHeight}
      />
      <h4 className="w-full mt-4 font-medium  text-lg hover:text-teal-600  transition-all delay-100 dark:hover:text-teal-400  text-gray-800 dark:text-gray-200">
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
          readingTime={readingTime === 0 ? 1 : readingTime}
          author={author}
        />
      </div>
    </div>
  );
}
