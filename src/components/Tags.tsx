import Link from 'next/link';

export function Tags({ tags }) {
  return (
    <>
      {tags &&
        tags.map((tag) => (
          <Link href={`/tag/${tag.tagSlug}`} key={tag.tagSlug}>
            <a className="ml-3 text-sm mt-2 lowercase text-gray-400 transition-all delay-100 hover:text-teal-800 dark:hover:text-teal-400 px-2  rounded-lg  border hover:border-teal-800 dark:hover:border-teal-400 border-slate-400">
              <span className=" text-teal-600">#</span>
              {`${tag.tagName}`}
            </a>
          </Link>
        ))}
    </>
  );
}
