import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html>
      <Head />
      <body className="bg-white dark:bg-[#121212] dark:text-gray-200 transition-colors ease-in-out duration-500">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
