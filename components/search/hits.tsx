import { Hit as AlgoliaHit } from '@algolia/client-search';
import { useHits, UseHitsProps } from 'react-instantsearch-hooks';

export type HitsProps<THit> = React.ComponentProps<'div'> &
  UseHitsProps & {
    hitComponent: (props: { hit: THit }) => JSX.Element;
  };

function Hits<THit extends AlgoliaHit<Record<string, unknown>>>({
  hitComponent: Hit,
  ...props
}: HitsProps<THit>) {
  const { hits } = useHits(props);
  // FIXMEl: add props.className as spreading
  return (
    <div className="ais-Hits">
      <ol className="ais-Hits-list">
        {hits.map((hit) => (
          <li key={hit.objectID} className="ais-Hit-item">
            <Hit hit={hit as unknown as THit} />
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Hits;
