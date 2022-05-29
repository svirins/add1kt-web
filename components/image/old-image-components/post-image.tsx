import Image from 'next/image';
import { shimmer, toBase64 } from '@/lib/content-utils';

const PostImage = ({ title, url }) => {
  const image = (
    <Image
      src={url}
      alt={`Cover Image for ${title}`}
      quality="90%"
      width="100%"
      height="100%"
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(
        shimmer('100%', '100%')
      )}`}
      // layout="responsive"
      // objectFit="cover"
      // objectFit="contain"
      // objectPosition="center"
      className="rounded-lg"
    />
  );

  return <div className="sm:mx-0">{image}</div>;
};

export default PostImage;
