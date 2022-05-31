import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import cn from 'classnames';

/* TODO: change next-sanity-image back to original repo/package, when a new version has been released
when a new version has been released */

function ResponsiveImage({ url, alt, slug = '' }) {
  const image = (
    <img
      src={urlFor(url).width(800).url()}
      alt={alt}
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

export default ResponsiveImage;
