import Img from "next/image";

import { GLOBAL_CONFIG } from "@/utils/global.config";

export function AvatarImage({
  url,
  alt = "A placeholder for image",
}: {
  url: string;
  alt?: string;
}) {
  return (
    <div className="relative  sm:mx-0">
      <Img
        alt={alt}
        src={url}
        loader={({ src, width, quality }) => `${src}?w=${width}&q=${quality}`}
        width={GLOBAL_CONFIG.images.defaultAvatarImageWidthHeight}
        height={GLOBAL_CONFIG.images.defaultAvatarImageWidthHeight}
        quality={GLOBAL_CONFIG.images.defaultQuality}
        className="rounded-full"
      />
    </div>
  );
}
