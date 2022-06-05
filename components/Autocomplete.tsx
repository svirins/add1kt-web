import { createElement, Fragment, useEffect, useRef, useState } from 'react';

import 'instantsearch.css/themes/satellite.css';
import '@algolia/autocomplete-theme-classic';

import type { SearchClient } from 'algoliasearch/lite';
import { autocomplete, AutocompleteOptions } from '@algolia/autocomplete-js';
import { BaseItem } from '@algolia/autocomplete-core';
import { useSearchBox } from 'react-instantsearch-hooks';

import { useDebounce } from '@/lib/customHooks';

type AutocompleteProps = Partial<AutocompleteOptions<BaseItem>> & {
  searchClient: SearchClient;
  className?: string;
};

type SetInstantSearchUiStateOptions = {
  query: string;
};

function Autocomplete({
  searchClient,
  className,
  ...autocompleteProps
}: AutocompleteProps) {
  const autocompleteContainer = useRef<HTMLDivElement>(null);

  const { query = '', refine } = useSearchBox();

  const [instantSearchUiState, setInstantSearchUiState] =
    useState<SetInstantSearchUiStateOptions>({ query });

  // const debouncedSetInstantSearchUiState = useDebounce(
  //   instantSearchUiState,
  //   500
  // );

  useEffect(() => {
    const val = instantSearchUiState?.query ? instantSearchUiState.query : '';
    refine(instantSearchUiState?.query);
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
