import cn from 'classnames';
import Img from 'next/image';
import Link from 'next/link';

import { urlFor } from '@/lib/sanity';

export function SanityImage({
  url,
  w,
  h = w,
  alt = 'A placeholder for image',
  slug = '',
  isRounded = false,
}) {
  const urlWithProps = urlFor(url)
    // .format('webp')
    // .fit('max')
    // .width(Number(width))
    // .height(height)
    // .auto('format')
    .url();

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 85}`;
  };

  const image = (
    <Img
      alt={alt}
      src={urlWithProps}
      loader={myLoader}
      width={w}
      height={h}
      className={cn(
        {
          'hover:opacity-75 transition-opacity': slug,
          'rounded-full': isRounded,
        },
        'rounded-lg'
      )}
    />
  );
  return (
    <div className="relative sm:mx-0">
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
