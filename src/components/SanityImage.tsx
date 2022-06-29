import cn from "classnames";
import Img from "next/future/image";
import Link from "next/link";

import { shimmer, toBase64 } from "@/utils/contentUtils";
import { GLOBAL_CONFIG } from "@/utils/global.config";
import { urlFor } from "@/utils/sanity";

export type SanityImageType = {
  url: string;
  alt?: string;
  slug?: string;
};

export function SanityImage({
  url,
  alt = "A placeholder text for image",
  slug = "",
}: SanityImageType) {
  const urlWithProps = urlFor(url).auto("format").url();
  const image = (
    <Img
      alt={alt}
      src={urlWithProps}
      loader={({ src, width, quality }) => `${src}?w=${width}&q=${quality}`}
      width={GLOBAL_CONFIG.images.defaultPostImageWidth}
      height={GLOBAL_CONFIG.images.defaultPostImageWidth}
      placeholder="blur"
      unoptimized={true}
      blurDataURL={`data:image/svg+xml;base64,${toBase64(
        shimmer(
          GLOBAL_CONFIG.images.defaultPostImageWidth,
          GLOBAL_CONFIG.images.defaultPostImageWidth
        )
      )}`}
      className={cn({
        "transition-opacity hover:opacity-75": slug,
        "rounded-lg": true,
      })}
    />
  );
  return (
    <div className="relative sm:mx-0">
      {slug ? (
        <Link href={`/blog/${slug}`}>
          <a aria-label={alt}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
