import { PortableText } from '@portabletext/react';
import SanityImage from '@/components/SanityImage';

import { globalConfig } from '@/config/global.config';

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative py-8">
          <SanityImage
            alt={value.alt ?? ''}
            url={value}
            width={globalConfig.images.defaultPostImageWidth}
            height={globalConfig.images.defaultPostImageHeight}
          />
        </div>
      );
    }
  }
};

export default function PostBody({ text }) {
  return (
    <div className="selection:bg-fuchsia-300 selection:text-fuchsia-900 max-w-2xl mx-auto w-full prose-p:py-4 prose  dark:prose-dark lg:prose-xl">
      <PortableText value={text} components={ptComponents} />
    </div>
  );
}
