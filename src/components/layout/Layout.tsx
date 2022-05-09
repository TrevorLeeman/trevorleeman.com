import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import MainContent from "../mainContent/MainContent";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`flex min-h-screen flex-col text-theme-black dark:bg-theme-black dark:text-theme-white`}
    >
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </div>
  );
};

export default Layout;
