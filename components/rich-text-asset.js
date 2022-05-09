import { EmbeddedContentfulImage } from '@/components/contentful-image';

export default function RichTextAsset({ id, assets }) {
  const asset = assets?.find((asset) => asset.sys.id === id);

  if (asset?.url) {
    return (
      <EmbeddedContentfulImage
        src={asset.url}
        width={asset.width}
        height={asset.height}
        alt={asset.description}
      />
    );
  }

  return null;
}
