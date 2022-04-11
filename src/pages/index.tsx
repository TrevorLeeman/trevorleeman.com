import type { ReactElement } from "react";
import { Layout } from "../components/layout";
import Link from "next/link";
import Head from "next/head";

export default function Homepage() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Trevor Leeman's resume site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>This is the homepage</h1>
      <Link href="/blog">
        <a>Blog</a>
      </Link>
    </>
  );
}

Homepage.getLayout = function thisis(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
