import Link from 'next/link';

export default function Tags({ tags, featured }) {
  return (
    <>
      {featured && (
        <span className="mr-1 text-xs  items-center font-bold leading-sm  px-1 py-1 bg-red-200 text-red-700 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-activity"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        </span>
      )}
      {tags &&
        tags.map((tag) => (
          <Link href={`/blog/tag/${tag.slug}`} key={tag.slug}>
            <a className="mr-1 text-xs items-center font-medium leading-sm  px-3 py-1 bg-orange-200 hover:bg-orange-300 text-orange-700 rounded-full">
              {tag.title}
            </a>
          </Link>
        ))}
    </>
  );
}
