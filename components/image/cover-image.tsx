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
      layout="intrinsic"
      alt={`Cover Image for ${title}`}
      className={cn(
        slug
          ? 'hover:opacity-75 transition-opacity hover:shadow-2xl'
          : 'shadow-2xl',
        'rounded-lg drop-shadow-md'
      )}
    />
  );

  return (
    <div className="sm:mx-0">
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
