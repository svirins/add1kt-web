import Img from "next/image";

import { globalConfig } from "@/utils/global.config";

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
        width={globalConfig.images.defaultAvatarImageWidthHeight}
        height={globalConfig.images.defaultAvatarImageWidthHeight}
        quality={globalConfig.images.defaultQuality}
        className="rounded-full"
      />
    </div>
  );
}
