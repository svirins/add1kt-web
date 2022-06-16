import { PortableText } from "@portabletext/react";

import { SanityImage } from "@/components/SanityImage";
import type { TPortableText as TPortableTextType } from "@/typings/schema-types";
import { globalConfig } from "@/utils/global.config";

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
          <SanityImage
            alt={value.alt ?? ""}
            url={value}
            width={globalConfig.images.defaultPostImageWidth}
            height={globalConfig.images.defaultPostImageHeight}
          />
        </div>
      );
    },
  },
};

export function PostBody({ text }: { text: TPortableTextType }) {
  return (
    <div className="prose-p:py-4 prose dark:prose-dark lg:prose-xl mx-auto w-full max-w-2xl  selection:bg-fuchsia-300 selection:text-fuchsia-900">
      <PortableText value={text} components={ptComponents} />
    </div>
  );
}
