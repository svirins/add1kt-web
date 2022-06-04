import { PortableText } from '@portabletext/react';

export default function PostBody({ text }) {
  return (
    <div className="max-w-2xl mx-auto w-full prose-p:py-4 prose  dark:prose-dark lg:prose-xl">
      <PortableText value={text} />
    </div>
  );
}
