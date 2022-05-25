import Image from 'next/image';
import Link from 'next/link';
import { shimmer, toBase64 } from '@/lib/content-utils';

const HeroImage = ({ title, url} ) => {
  const image = (
    <Image
      src={url}
      quality="90%"
      width="100%"
      height="100%"
      // placeholder="blur"
      // blurDataURL={`data:image/svg+xml;base64,${toBase64(
      //   shimmer('100%', '100%')
      // )}`}
      // layout="responsive"
      // objectFit="cover"
      // objectFit="contain"
      // objectPosition="center"
      alt={`Cover Image for ${title}`}
      className="rounded-lg"
    />
  );

  return (
    <div className="sm:mx-0">
      {image}
    </div>
  );
};

export default HeroImage;
