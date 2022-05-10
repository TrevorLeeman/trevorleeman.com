import type { ReactElement } from "react";
import Layout from "../components/layout/Layout";
import Head from "next/head";
import Socials from "../components/socials/Socials";

const Homepage = () => {
  const CANONICAL_URL = "https://www.trevorleeman.com";

  return (
    <>
      <Head>
        <title>Trevor Leeman</title>
        <meta property="og:title" content="Trevor Leeman" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL_URL} />
        <link rel="canonical" href={CANONICAL_URL} />
      </Head>
      <div className="flex flex-grow flex-col items-center justify-center pb-52">
        <h1 className="flex flex-col pb-7 font-abel">
          <span className="text-2xl font-semibold md:text-4xl">
            Hi, my name is
          </span>
          <span>
            <span className="font-default text-8xl font-bold text-theme-purple dark:text-theme-pink md:text-[9.5rem]">
              Trevor
            </span>
            <span className="text-lg font-semibold md:text-2xl"> and</span>
          </span>
          <span className="text-3xl md:text-5xl">I'M A FRONTEND ENGINEER</span>
        </h1>
        <Socials />
      </div>
    </>
  );
};

Homepage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Homepage;
