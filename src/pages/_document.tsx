import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
          href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
        ></link>
      </Head>
      <body className="bg-white dark:bg-[#121212] dark:text-gray-200 transition-colors ease-in-out">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
