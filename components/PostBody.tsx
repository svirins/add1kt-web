import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity';

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative">
          <img
            className="py-8 rounded-lg"
            alt={value.alt || ' '}
            src={urlFor(value).width(800).height(480).url()}
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
