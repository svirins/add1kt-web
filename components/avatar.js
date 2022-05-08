import Link from 'next/link';
import ContentfulImage from './contentful-image';
export default function Avatar({ name, picture, slug }) {
  return (
    <div className="flex items-center mr-4">
      <div className="relative w-12 h-12 mr-2">
        <ContentfulImage
          src={picture.url}
          width="100%"
          height="100%"
          className="rounded-full"
          alt={name}
        />
      </div>
      <Link href={`/author/${slug}`}>
        <a className="hover:underline text-base font-medium ">{name}</a>
      </Link>
    </div>
  );
}
