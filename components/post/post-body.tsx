import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import RichTextAsset from '@/components/misc/rich-text-asset';
import { FBShare } from '@/components/misc/social-share';
import markdownStyles from '@/styles/markdown-styles.module.css';

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
    <div className="max-w-2xl mx-auto">
      <section className={markdownStyles['markdown']}>
        {documentToReactComponents(
          content.json,
          customMarkdownOptions(content)
        )}
        <FBShare />
      </section>
    </div>
  );
}
