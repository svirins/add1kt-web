import { Hit as AlgoliaHit } from '@algolia/client-search';

import Snippet from '@/components/search/snippet';

type HitProps = {
  hit: AlgoliaHit<{
    name: string;
    tags: string[];
  }>;
};

function Hit({ hit }: HitProps) {
  return (
    <article className="hit">
      <div>
        <h1>
          <Snippet hit={hit} attribute="name" />
        </h1>
        <div>
          <strong>{hit.tags[0]}</strong>
        </div>
      </div>
    </article>
  );
}

export default Hit;
