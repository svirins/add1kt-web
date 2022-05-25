import Image from 'next/image';
import Link from 'next/link';
import { shimmer, toBase64 } from '@/lib/content-utils';
import { ImageProps } from 'extra-types';
import cn from 'classnames';

const PreviewImage = ({ title, url, slug }: ImageProps) => {
  const image = (
    <Image
      src={url}
      quality="90%"
      width={16}
      height={9}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(
        shimmer('100%', '100%')
      )}`}
      layout="responsive"
      objectFit="cover"
      // objectFit="contain"
      // objectPosition="center"
      alt={`Cover Image for ${title}`}
      className={cn(
        { 'hover:opacity-75 transition-opacity': slug },
        'rounded-lg'
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
        {image}
      )}
    </div>
  );
};

export default PreviewImage;
