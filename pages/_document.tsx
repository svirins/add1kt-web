import { Html, Head, Main, NextScript } from 'next/document';

export default function Document(props) {
  return (
    <Html lang="en">
      <Head></Head>
      <body className="text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900  ">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
