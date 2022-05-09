import Image from 'next/image';

const contentfulLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 90}`;
};

export const ContentfulImage = (props) => {
  return <Image loader={contentfulLoader} {...props} />;
};

export const EmbeddedContentfulImage = (props) => {
  return <Image loader={contentfulLoader} {...props} />;
};
