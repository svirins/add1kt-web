import cn from 'classnames';
import Link from 'next/link';

import { urlFor } from '@/lib/sanity';
import Img from 'next/image';
import { shimmer } from '@/lib/contentUtils';
export function SanityImage({
  url,
  width,
  height = width,
  alt = 'A placeholder for image',
  slug = '',
  isRounded = false
}) {
  const urlWithProps = urlFor(url)
    // .format('webp')
    // .fit('max')
    // .width(Number(width))
    // .height(height)
    // .auto('format')
    .url();

  const sanityImageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const image = (
    <Img
      alt={alt}
      src={url}
      loader={sanityImageLoader}
      width={width}
      height={height}
      layout="responsive"
      objectFit="cover"
      className={cn(
        {
          'hover:opacity-75 transition-opacity': slug,
      'rounded-full': isRounded  },
        'rounded-lg'
      )}
    />
  );
  return (
    <div className="sm:mx-0  relative">
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
