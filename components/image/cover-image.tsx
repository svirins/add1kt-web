import Image from 'next/image';
import Link from 'next/link';
import { shimmer, toBase64 } from '@/lib/content-utils';
import { CoverImageProps } from 'additional';
import cn from 'classnames';

const CoverImage = ({
  title,
  url,
  slug,
  width,
  height = 1000
}: CoverImageProps) => {
  const image = (
    <Image
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
      layout="intrinsic"
      alt={`Cover Image for ${title}`}
      className={cn(
        slug
          ? 'hover:opacity-75 transition-opacity hover:shadow-2xl'
          : 'shadow-2xl',
        'rounded-lg drop-shadow-md'
      )}
      src={url}
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
