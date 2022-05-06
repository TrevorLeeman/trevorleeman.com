import type { ReactElement } from "react";
import Layout from "../components/layout/Layout";
import Head from "next/head";
import Socials from "../components/socials/Socials";

const Homepage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Trevor Leeman's resume site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center flex-grow pb-52">
        <div className="flex flex-col pb-7">
          <h1 className="text-5xl">Hi, my name is</h1>
          <h1>
            <span className="font-bold text-9xl text-theme-purple dark:text-theme-pink">
              Trevor
            </span>
            <span className="text-2xl"> and</span>
          </h1>
          <h1 className="text-5xl">I'M A FRONTEND DEVELOPER</h1>
        </div>
        <Socials />
      </div>
    </>
  );
};

Homepage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Homepage;
