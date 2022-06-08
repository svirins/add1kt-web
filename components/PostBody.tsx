import { PortableText } from '@portabletext/react';

import { SanityImage } from '@/components/SanityImage';
import { globalConfig } from '@/config/global.config';

const ptComponents = {
  types: {
    image: ({ value }) => {
      // if (!value?.asset?._ref) {
      //   return null;
      // }
      return (
        <div className="relative py-8">
          <SanityImage
            alt={value.alt ?? ''}
            url={value}
            w={globalConfig.images.defaultPostImageWidth}
            h={globalConfig.images.defaultPostImageHeight}
          />
        </div>
      );
    },
  },
};

export function PostBody({ text }) {
  return (
    <div className="prose-p:py-4 prose dark:prose-dark mx-auto w-full max-w-2xl  selection:bg-fuchsia-300 selection:text-fuchsia-900">
      <PortableText value={text} components={ptComponents} />
    </div>
  );
}
