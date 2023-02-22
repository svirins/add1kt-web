import { PortableText } from "@portabletext/react";

import { SanityImage } from "@/components/SanityImage";
import type { TPortableText as TPortableTextType } from "@/typings/schema-types";

const ptComponents = {
  // TODO:  console log value here and determine its type
  types: {
    image: ({ value }: { value: any }) => {
      // eslint-disable-next-line no-underscore-dangle
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative py-8">
          <SanityImage alt={value.alt ?? ""} url={value} />
        </div>
      );
    },
    messageBox: ({ value }: { value: any }) => {
      return (
        <div className="dark:[#1e293b] mb-4 w-full text-black·dark:text-yellow-50 rounded-lg bg-[#cccccc] p-4">
          <div className="flex flex-row">
            <h6 className="font-2xl font-semibold text-black·dark:text-yellow-50">{`💡 ${value.title}`}</h6>
          </div>
          <div>
            <div className="md:prose-lg w-full max-w-2xl text-black·dark:text-yellow-50">
              {value.message}
            </div>
          </div>
        </div>
      );
    },
  },
};

export function PostBody({ text }: { text: TPortableTextType }) {
  return (
    <div className="prose dark:prose-dark lg:prose-xl mx-auto w-full max-w-2xl  selection:bg-green-300 selection:text-green-900">
      <PortableText value={text} components={ptComponents} />
    </div>
  );
}
