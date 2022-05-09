import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import MainContent from "../mainContent/MainContent";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col text-theme-black transition duration-200 dark:bg-theme-black dark:text-theme-white">
    <div className="flex min-h-screen flex-col">
      <Header />
      <MainContent>{children}</MainContent>
    </div>
    <Footer />
  </div>
);

export default Layout;
