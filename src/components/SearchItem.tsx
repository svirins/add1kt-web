import type { AutocompleteComponents } from "@algolia/autocomplete-js";
import type { Hit } from "@algolia/client-search";

export type Item = Hit<{
  slug: string;
  title: string;
}>;
export type ItemProps = {
  hit: Item;
  components: AutocompleteComponents;
  locale: string;
};

export function SearchItem({ hit, components, locale }: ItemProps) {
  const isPl = locale === "pl" ? "/pl" : "";
  return (
    <a className="aa-ItemLink" href={`${isPl}/blog/${hit.slug}`}>
      <div className="aa-ItemContent">
        {/* <div className="ItemCategory">{hit.tags[0]}</div> */}
        <div className="aa-ItemTitle">
          <components.Highlight hit={hit} attribute="title" />
        </div>
      </div>
    </a>
  );
}
