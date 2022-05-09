import ContentfulImage from './contentful-image';
import Link from 'next/link';
import cn from 'classnames';
// TODO: fix animation
export default function CoverImage({ title, url, slug, width, height }) {
  const image = (
    <ContentfulImage
      width={width}
      height={height}
      layout="responsive"
      alt={`Cover Image for ${title}`}
      className={cn('shadow-small', {
        'hover:shadow-medium transition-shadow duration-200': slug
      })}
      src={url}
    />
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
