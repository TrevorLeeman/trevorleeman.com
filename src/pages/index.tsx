import type { ReactElement } from 'react';
import Head from 'next/head';
import Socials from '../components/homepage/socials/Socials';
import IntroMessage from '../components/homepage/introMessage/IntroMessage';
import Header from '../components/header/Header';
import HomepageLayout from '../components/layout/HomepageLayout';

const Homepage = () => {
  const CANONICAL_URL = 'https://www.trevorleeman.com';

  return (
    <>
      <Head>
        <title>Trevor Leeman</title>
        <meta property="og:title" content="Trevor Leeman" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL_URL} />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="min-h-screen">
        <Header />
        <section className="mt-24 flex flex-col items-center justify-center">
          <IntroMessage />
          <Socials />
        </section>
      </div>
      <section className="mt-auto flex flex-col items-center justify-center">
        <h2 className="font-default text-4xl font-bold">Featured Personal Projects</h2>
      </section>
    </>
  );
};

Homepage.getLayout = (page: ReactElement) => {
  return <HomepageLayout>{page}</HomepageLayout>;
};

export default Homepage;
