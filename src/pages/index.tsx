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
      <div className="flex flex-grow flex-col items-center justify-center pb-52">
        <div className="flex flex-col pb-7">
          <h1 className="text-xl font-semibold md:text-3xl">Hi, my name is</h1>
          <h1>
            <span className=" text-7xl font-bold text-theme-purple dark:text-theme-pink md:text-9xl">
              Trevor
            </span>
            <span className="text-md font-semibold md:text-xl"> and</span>
          </h1>
          <h1 className="font-letter-sketch text-2xl md:text-5xl">
            I'M A FRONTEND ENGINEER
          </h1>
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
