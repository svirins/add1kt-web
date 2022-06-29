import Img from "next/image";

import { shimmer, toBase64 } from "@/utils/contentUtils";
import { GLOBAL_CONFIG } from "@/utils/global.config";
import { urlFor } from "@/utils/sanity";

export type SanityImageType = {
  url: string;
  alt?: string;
  slug?: string;
};

export function RoundImage({ url, alt = "A placeholder text for image" }: SanityImageType) {
  const urlWithProps = urlFor(url).auto("format").url();
  const image = (
    <Img
      alt={alt}
      src={urlWithProps}
      loader={({ src, width: w, quality }) => `${src}?w=${w}&q=${quality}`}
      width={GLOBAL_CONFIG.images.defaultRoundImageWidthHeight}
      height={GLOBAL_CONFIG.images.defaultRoundImageWidthHeight}
      placeholder="blur"
      unoptimized={true}
      blurDataURL={`data:image/svg+xml;base64,${toBase64(
        shimmer(
          GLOBAL_CONFIG.images.defaultRoundImageWidthHeight,
          GLOBAL_CONFIG.images.defaultRoundImageWidthHeight
        )
      )}`}
      className="rounded-full"
    />
  );
  return <div className="relative sm:mx-0">{image}</div>;
}
