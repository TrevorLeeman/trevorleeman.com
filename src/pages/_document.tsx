import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html className="light">
      <Head />
      <body className="bg-white dark:bg-slate-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
