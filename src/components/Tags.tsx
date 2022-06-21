import Link from "next/link";

import type { TTagBase } from "@/typings/schema-types";

export function Tags({ tags }: { tags: TTagBase[] }) {
  return (
    <>
      {tags &&
        tags.map((tag) => (
          <Link href={`/tag/${tag.tagSlug}`} key={tag.tagSlug}>
            {/* <a className="ml-3 mt-2 rounded-lg border border-slate-400 px-2 text-sm lowercase text-gray-400 transition-all  delay-100  hover:border-emerald-800 hover:text-emerald-800 dark:hover:border-emerald-400 dark:hover:text-green-400">
              <span className=" text-emerald-600">#</span>
              {`${tag.tagName}`}
            </a> */}
            <a className="ml-1 mt-2 text-sm lowercase text-stone-900 transition-all  delay-100  hover:text-orange-600  dark:text-stone-100 dark:hover:text-green-400">
              <span className=" text-orange-600 dark:text-green-400">#</span>
              {`${tag.tagName}`}
            </a>
          </Link>
        ))}
    </>
  );
}
