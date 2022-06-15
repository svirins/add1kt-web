import "@algolia/autocomplete-theme-classic";
import "instantsearch.css/themes/satellite.css";

import type { AutocompleteComponents } from "@algolia/autocomplete-js";
import { getAlgoliaResults } from "@algolia/autocomplete-js";
import algoliasearch from "algoliasearch";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

import { getIndexNameByLocale } from "@/utils/contentUtils";

import { Autocomplete } from "./Autocomplete";
import type { Item } from "./SearchItem";
import { SearchItem } from "./SearchItem";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

export function Search() {
  // TODO: remove nasty hack of setting default valye
  const { locale = "ru" } = useRouter();
  const t = useTranslations("Search");
  const indexName = getIndexNameByLocale(locale);
  return (
    <div>
      <Autocomplete
        openOnFocus={false}
        detachedMediaQuery=""
        placeholder={t("inputPlaceholder")}
        getSources={({ query }: { query: string }) => [
          {
            sourceId: "posts",
            getItemUrl({ item }: { item: Item }) {
              return `/post/${item.slug}`;
            },
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName,
                    query,
                  },
                ],
              });
            },
            templates: {
              item({
                item,
                components,
              }: {
                item: Item;
                components: AutocompleteComponents;
              }) {
                return <SearchItem hit={item} components={components} />;
              },
            },
          },
        ]}
      />
    </div>
  );
}
