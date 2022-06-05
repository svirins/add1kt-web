import type { Hit as AlgoliaHit } from 'instantsearch.js/es/types';
import Link from 'next/link';

import { Snippet } from 'react-instantsearch-hooks-web';

type HitProps = {
  hit: AlgoliaHit<{
    title: string;
    slug: string;
    tags: string[];
  }>;
};

function Hit({ hit }: HitProps) {
  return (
    <article className="hit">
      <Link href={`/blog/${hit.slug}`} className=" transition-all delay-100 text-gray-800 dark:text-gray-50 hover:text-teal-800 dark:hover:text-teal-400
">
        <Snippet hit={hit} attribute="title" />
      </Link>
    </article>
  );
}

export default Hit;
