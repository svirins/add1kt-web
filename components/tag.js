import Link from 'next/link';
export default function Tag({ name, slug, isFeatured }) {
  return (
    <div className="flex items-center">
      <Link href={`/tag/${slug}`}>
        <a className="bg-blue-100  text-xs hover:bg-blue-200 text-blue-800  font-medium mr-1 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 dark:hover:bg-blue-300">
          {name}
        </a>
      </Link>
    </div>
  );
}
