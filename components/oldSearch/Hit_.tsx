import { Hit as AlgoliaHit } from '@algolia/client-search';
import Link from 'next/link';
// TODO: change name to title
type HitProps = {
  hit: AlgoliaHit<{
    title: string;
    slug: string;
    tags?: string[];
  }>;
};

function Hit({ hit }: HitProps) {
  console.log('HIT FOUND:', hit);

  return (
    <article className="hit">
      <Link href={`/blog/${hit.slug}`}>
        <a>{hit.title}</a>
      </Link>
    </article>
  );
}

export default Hit;
