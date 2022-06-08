import cn from 'classnames';
import Link from 'next/link';

import { urlFor } from '@/lib/sanity';
import Img from 'next/image';

export function SanityImage({
  url,
  width,
  height = width,
  alt = 'A placeholder for image',
  slug = '',
  isRounded = false
}) {

  const urlWithProps = urlFor(url)
    .format('webp')
    // .fit('max')
    // .width(Number(width))
    // .height(height)
    // .auto('format')
    .url();

  const myLoader = ({ src, width, quality }) => {
    return `${url}?w=${width}&q=${quality || 75}`;
  };

  const image = (
    <Img
      alt={alt}
      src={urlWithProps}
      loader={myLoader}
      width={width}
      height={height}
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
          <a aria-label={alt}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}

export default SanityImage;
