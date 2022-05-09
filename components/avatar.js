import Link from 'next/link';
import Image from 'next/image';

export default function Avatar({ name, picture, slug }) {
  return (
    <div className="flex items-center mr-4">
      <div className="relative w-12 h-12 mr-2">
        <Image
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
