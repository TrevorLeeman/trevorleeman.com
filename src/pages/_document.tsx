import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  const DESCRIPTION =
    'Trevor Leeman is a software engineer based out of Seattle, WA. His primary focus is on Frontend Engineering using React, NextJS, TypeScript, and CSS.';
  const OG_IMAGE_URL = 'https://i.imgur.com/5JkkVEO.png';

  return (
    <Html lang="en">
      <Head>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="twitter:image" content={OG_IMAGE_URL} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Abel&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
