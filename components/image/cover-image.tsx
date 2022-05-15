import Image from 'next/image';
import Link from 'next/link';
import { shimmer, toBase64 } from '@/lib/content-utils';
import { CoverImageProps } from 'additional';

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
      layout="responsive"
      alt={`Cover Image for ${title}`}
      className="hover:shadow-medium transition-shadow duration-200"
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
