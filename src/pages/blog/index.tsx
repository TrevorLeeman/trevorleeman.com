import Head from "next/head";
import { ReactElement } from "react";
import { Layout } from "../../components/layout";

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Trevor Leeman's blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>This is the blog</h1>
    </>
  );
}

Blog.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
