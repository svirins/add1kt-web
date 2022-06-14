import cn from 'classnames';
import Img from 'next/image';
import Link from 'next/link';

import { shimmer, toBase64 } from '@/utils/contentUtils';
import { urlFor } from '@/utils/sanity';

export type SanityImageType = {
  url: string;
  width: number;
  height?: number;
  alt?: string;
  slug?: string;
  isRounded?: boolean;
};

export function SanityImage(
  {
    url,
    width,
    height = width,
    alt = 'A placeholder text for image',
    slug = '',
    isRounded = false,
  }: SanityImageType,
) {
  const urlWithProps = urlFor(url).auto('format').url();
  const image = (
    <Img
      alt={alt}
      src={urlWithProps}
      // loader={sanityImageLoader}
      width={width}
      height={height}
      layout="responsive"
      objectFit="cover"
      placeholder="blur"
      unoptimized={true}
      blurDataURL={
        `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`
      }
      className={cn({
        'hover:opacity-75 transition-opacity': slug,
        'rounded-full': isRounded,
        'rounded-lg': !isRounded,
      },)}
    />
  );
  return (
    <div className="sm:mx-0 relative">
      {slug ? (
        <Link href={`/blog/${slug}`}>
          <a aria-label={alt}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
