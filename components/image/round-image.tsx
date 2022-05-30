import { urlFor } from '@/lib/sanity';

function RoundImage({ url, height = 44, width = 44, alt, className }) {
  // const imageProps: UseNextSanityImageProps = useNextSanityImage({
  //   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  //   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  //   }, url);
  return (
    <img
      src={urlFor(url).width(width).url()}
      className="rounded-full align-middle"
      // height={`${height}px`}
      // width={`${width}px`}
      alt={alt}
    />
    // <Image
    //   {...imageProps}
    //   alt={alt}
    //   quality={90}
    //   layout="responsive"
    //   sizes="44px, 44px"
    //   className="rounded-full align-middle"
    // />
  );
}

export default RoundImage;
