import Link from 'next/link';
import { urlFor } from '@/lib/sanity'
import cn from 'classnames';


/* TODO: change next-sanity-image back to original repo/package, when a new version has been released
when a new version has been released */

export function ResponsiveImage({ url, alt, slug = '' }) {
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
    <div className="sm:mx-0 mx-5 relative">
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



export function AvatarImage({ url, height = 44, width = 44, alt }) {
  // const imageProps: UseNextSanityImageProps = useNextSanityImage({
  //   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  //   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  //   }, url);
  return (
    <img
      src={urlFor(url).width(width).url()}
      className="rounded-full align-middle"
      // height={`${height}px`}
      // width={`${width}px`}
      alt={alt}
    />
    // <Image
    //   {...imageProps}
    //   alt={alt}
    //   quality={90}
    //   layout="responsive"
    //   sizes="44px, 44px"
    //   className="rounded-full align-middle"
    // />
  );
}
