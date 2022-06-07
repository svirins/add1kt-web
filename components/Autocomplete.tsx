import { useTranslations } from 'next-intl';

import { autocomplete } from '@algolia/autocomplete-js';
import React, { createElement, Fragment, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

export default function Autocomplete(props) {
  const t = useTranslations('Search');
  const containerRef = useRef(null);
  const panelRootRef = useRef(null);
  const rootRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      translations: {
        clearButtonTitle: t('clearButtonTitle'),
        detachedCancelButtonText: t('detachedCancelButtonText'),
        submitButtonTitle: t('submitButtonTitle')
      },
      placeholder: t('inputPlaceholder'),
      renderer: { createElement, Fragment, render: () => {} },
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(children);
      },
      ...props
    });
    return () => {
      search.destroy();
    };
  }, [props]);

  return <div ref={containerRef} />;
}
