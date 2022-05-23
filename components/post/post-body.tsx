import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import RichTextAsset from '@/components/misc/rich-text-asset';

const customMarkdownOptions = (content) => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <RichTextAsset
        id={node.data.target.sys.id}
        assets={content.links.assets.block}
      />
    )
  },
  // replace /n  with <br />
  renderText: (text) => {
    return text.split('\n').reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  }
});
export default function PostBody({ content }) {
  return (
    <div className="w-full prose dark:prose-dark">
      {documentToReactComponents(content.json, customMarkdownOptions(content))}
    </div>
  );
}
