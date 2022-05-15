import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';

// TODO: fix animation
export default function CoverImage({
  title,
  imageData,
  slug = undefined,
}) {
  const image = (
    <Image
      width={imageData.width}
      height={imageData.height}
      layout="responsive"
      alt={`Cover Image for ${title}`}
      className={cn('shadow-small', {
        'hover:shadow-medium transition-shadow duration-200': slug
      })}
      src={imageData.url}
    />
  );

  return (
    <div className="mb-8 md:mb-16 sm:mx-0">
      {slug ? (
        <Link href={`/blog/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
