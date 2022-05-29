import Link from 'next/link';
import AvatarImage from 'next/image';

export default function Avatar({
  name,
  picture,
  slug = '',
  height = 40,
  width = 40
}) {
  return (
    <div className="flex items-center flex-nowrap">
      <AvatarImage
        src={picture}
        height={height}
        width={width}
        className="rounded-full"
        alt={name}
      />
      {slug && (
        <Link href={`/author/${slug}`}>
          <a className="hover:underline ml-2 text-sm text-gray-700 dark:text-gray-300">
            {name}
          </a>
        </Link>
      )}
    </div>
  );
}
