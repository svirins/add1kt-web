import Link from "next/link";

import { PostMeta } from "@/components/PostMeta";
import { SanityImage } from "@/components/SanityImage";
import { Tags } from "@/components/Tags";
import type { TAuthorBase, TTagBase } from "@/typings/schema-types";
import { truncate } from "@/utils/contentUtils";
import { GLOBAL_CONFIG } from "@/utils/global.config";

export type PostCardProps = {
  title: string;
  previewImage: string;
  date: string;
  author: TAuthorBase;
  tags: TTagBase[];
  slug: string;
  readingTime: number;
};

export function PostCard({
  title,
  previewImage,
  date,
  author,
  tags,
  slug,
  readingTime,
}: PostCardProps) {
  return (
    <div className="my-4 md:my-0">
      <SanityImage
        slug={slug}
        alt={title}
        url={previewImage}
        width={GLOBAL_CONFIG.images.defaultPostPreviewImageWidth}
        height={GLOBAL_CONFIG.images.defaultPostImagePreviewHeight}
      />
      <h4 className="animated link mt-4  w-full text-lg  font-medium">
        <Link href={`/blog/${slug}`}>
          <a>{truncate(title)}</a>
        </Link>
      </h4>
      <div className="flex flex-row justify-end  text-sm">{<Tags tags={tags} />}</div>
      <div className="flex flex-row ">
        <PostMeta date={date} readingTime={readingTime === 0 ? 1 : readingTime} author={author} />
      </div>
    </div>
  );
}
