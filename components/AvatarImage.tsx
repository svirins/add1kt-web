import Img from 'next/image';

import { globalConfig } from '@/config/global.config';

export function AvatarImage({ url, alt = 'A placeholder for image' }) {
  const sanityImageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality}`;
  };

  return (
    <div className="sm:mx-0  relative">
      <Img
        alt={alt}
        src={url}
        loader={sanityImageLoader}
        width={globalConfig.images.defaultAvatarImageWidthHeight}
        height={globalConfig.images.defaultAvatarImageWidthHeight}
        quality={globalConfig.images.defaultQuality}
        className="rounded-full"
      />
    </div>
  );
}
