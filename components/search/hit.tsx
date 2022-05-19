import { Hit as AlgoliaHit } from '@algolia/client-search';
import Link from 'next/link';
import Snippet from '@/components/search/snippet';
// TODO: implement display slug as next.js Link component
type HitProps = {
  hit: AlgoliaHit<{
    name: string;
    slug: string;
    tags: string[];
  }>;
};

function Hit({ hit }: HitProps) {
  console.log('HIT COMPONENT REPORTING:', hit);
  return (
    <article className="hit">
      <div>
        <a href={`/blog/loveaddiction`}>
          <Snippet hit={hit} attribute="name" />
        </a>
        <div>
          {/* {hit?.tags?.map((tag, index) => (
            <strong key={index}>tag</strong>
          ))} */}
          {hit.tags[0]}
        </div>
      </div>
    </article>
  );
}

export default Hit;
