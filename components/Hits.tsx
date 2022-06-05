import { Hit as AlgoliaHit } from '@algolia/client-search';
import { useHits, UseHitsProps } from 'react-instantsearch-hooks';
import Link from 'next/link';

export type HitsProps<THit> = React.ComponentProps<'div'> &
  UseHitsProps & {
    hitComponent: (props: { hit: THit }) => JSX.Element;
    classNames?: string;
  };

function Hits<THit extends AlgoliaHit<Record<string, unknown>>>({
  hitComponent: Hit,
  ...props
}: HitsProps<THit>) {
  const { hits } = useHits(props);
  return (
    <div className={props.classNames}>
      <ol>
        {hits?.map((hit) => (
          <li key={hit.objectID}>
                      <Link href={`/blog/${hit.slug}`}>

            <Hit hit={hit as unknown as THit} />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Hits;
