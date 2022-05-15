import Link from 'next/link';
import Image from 'next/image';

export default function Avatar({ name, picture, slug }) {
  return (
    <>
      <Image
        src={picture.url}
            height={24}
            width={24}
        className="rounded-full"
        alt={name}
      />
      <Link href={`/blog/author/${slug}`}>
        <a className="hover:underline ml-2 text-sm text-gray-700 dark:text-gray-300">{name}</a>
      </Link>
    </>
  );
}
