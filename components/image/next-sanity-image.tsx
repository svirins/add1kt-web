import Img from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import client from '@/lib/sanity'


export function ResponsiveImage({ url, alt, hasHoverState }) {
  const imageProps = useNextSanityImage(
  client,
  url,
  {
    blurUpImageWidth: 124,
    blurUpImageQuality: 40,
    blurUpAmount: 24
  }
  );
  return (
    <Img {...imageProps} layout="responsive" sizes="(max-width: 800px) 100vw, 800px" />
  )
}



export function AvatarImage({ url, height = 40, width = 40, alt }) {
  return <Img />
}
