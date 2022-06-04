import type { Hit as AlgoliaHit } from 'instantsearch.js/es/types';
import Link from 'next/link';

import { Snippet } from 'react-instantsearch-hooks-web';

type HitProps = {
  hit: AlgoliaHit<{
    title: string;
    slug: string,
    tags: string[];
  }>;
};

export default function Hit({ hit }: HitProps) {
  return (
    <article className="hit">
      <div>
        <p>
          <Link href={`/blog/${hit.slug}`}>
            <Snippet hit={hit} attribute="title" />
          </Link>
        </p>
      </div>
    </article>
  );
}
