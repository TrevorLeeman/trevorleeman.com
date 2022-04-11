import React from "react";
import Head from "next/head";
import { Header } from "../header";
import { Footer } from "../footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
