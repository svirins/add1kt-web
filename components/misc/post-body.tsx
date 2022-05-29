import { PortableText } from '@portabletext/react';

export default function PostBody({ text }) {
  return (
    <div className="max-w-3xl mx-auto w-full prose dark:prose-dark">
      <PortableText value={text} />
    </div>
  );
}
