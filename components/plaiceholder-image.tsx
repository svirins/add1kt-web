import Image from 'next/image';
import Link from 'next/link';
import { getPlaiceholder } from 'plaiceholder';
import { BlurhashCanvas } from 'react-blurhash';

export const PlaiceholderImage = ({ title, url, slug, width, height }) => {
  const { blurhash, img } = getPlaiceholder(url);
  // const image = (
  //   <Image
  //     width={width}
  //     height={height}
  //     placeholder="blur"
  //     layout="responsive"
  //     alt={`Cover Image for ${title}`}
  //     className="hover:shadow-medium transition-shadow duration-200"
  //     src={url}
  //   />
  // );

  const imageWithBlurHash = (
    <>
      <BlurhashCanvas
        {...blurhash}
        punch={1}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
      <Image {...img} />
    </>
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/blog/${slug}`}>
          <a aria-label={title}>{imageWithBlurHash}</a>
        </Link>
      ) : (
        imageWithBlurHash
      )}
    </div>
  );
};

export default PlaiceholderImage;
