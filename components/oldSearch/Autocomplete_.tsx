import { createElement, Fragment, useEffect, useRef, useState } from 'react';

import type { SearchClient } from 'algoliasearch/lite';
import { useSearchBox } from 'react-instantsearch-hooks';
import { autocomplete, AutocompleteOptions, Render } from '@algolia/autocomplete-js';
import { BaseItem } from '@algolia/autocomplete-core';

import '@algolia/autocomplete-theme-classic';

type AutocompleteProps = Partial<AutocompleteOptions<BaseItem>> & {
  searchClient: SearchClient;
  className?: string;
  indexName: string;
};

type SetInstantSearchUiStateOptions = {
  query: string;
};

function Autocomplete({
  searchClient,
  className,
  indexName,
  ...autocompleteProps
}: AutocompleteProps) {
  const autocompleteContainer = useRef<HTMLDivElement>(null);

  const { query, refine: setQuery } = useSearchBox();

  const [instantSearchUiState, setInstantSearchUiState] =
    useState<SetInstantSearchUiStateOptions>({ query });

  useEffect(() => {
    setQuery(instantSearchUiState.query);
  }, [instantSearchUiState]);

  useEffect(() => {
    if (!autocompleteContainer.current) {
      return;
    }

    const autocompleteInstance = autocomplete({
      ...autocompleteProps,
      container: autocompleteContainer.current,
      initialState: { query },
      onReset() {
        setInstantSearchUiState({ query: '' });
      },
      onSubmit({ state }) {
        setInstantSearchUiState({ query: state.query });
      },
      onStateChange({ prevState, state }) {
        if (prevState.query !== state.query) {
          setInstantSearchUiState({
            query: state.query
          });
        }
      },
      renderer: { createElement, Fragment, render: () => {} }
    });

    return () => autocompleteInstance.destroy();
  }, []);

  return <div className={className} ref={autocompleteContainer} />;
}
export default Autocomplete;
