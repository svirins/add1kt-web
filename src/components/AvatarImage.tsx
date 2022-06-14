import Img from 'next/image';

import { globalConfig } from '@/config/global.config';

export function AvatarImage(
  { url, alt = 'A placeholder for image' }: {
    url: string;
    alt?: string;
  },
) {
  return (
    <div className="sm:mx-0  relative">
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
