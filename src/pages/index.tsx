import type { ReactElement } from "react";
import Layout from "../components/layout/Layout";
import Head from "next/head";

const Homepage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Trevor Leeman's resume site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>This is the homepage</h1>
    </>
  );
};

Homepage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Homepage;
