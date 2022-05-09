import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import RichTextAsset from '@/components/rich-text-asset';
import { FBShare } from '@/components/social-share';

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
// dark: prose - invert;
export default function PostBody({ content }) {
  return (
    <section className="max-w-3xl mx-auto prose  prose-headings:underline prose-a:text-blue-600">
      {documentToReactComponents(content.json, customMarkdownOptions(content))}
      <FBShare />
    </section>
  );
}
