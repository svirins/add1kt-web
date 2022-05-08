import Link from 'next/link';
export default function Tag({ name, slug }) {
  return (
    <div className="flex">
      <Link href={`/tag/${slug}`}>
        <a className="mr-2 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-orange-200 hover:bg-orange-300 text-orange-700 rounded-full">
          {name}
        </a>
      </Link>
    </div>
  );
}
