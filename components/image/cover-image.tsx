import Image from 'next/image';
import Link from 'next/link';
import { shimmer, toBase64 } from '@/lib/content-utils';
import { ImageProps } from 'extra-types';
import cn from 'classnames';

const CoverImage = ({ title, url, width, height, slug }: ImageProps) => {
  const image = (
    <Image
      width={width}
      height={height}
      src={url}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(
        shimmer(width, height)
      )}`}
      layout="responsive"
      objectFit="contain"
      objectPosition="center"
      alt={`Cover Image for ${title}`}
      className={cn(
        { 'hover:opacity-75 transition-opacity': slug },
        'rounded-md'
      )}
    />
  );

  return (
    <div className="sm:mx-0 relative">
      {slug ? (
        <Link href={`/blog/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
