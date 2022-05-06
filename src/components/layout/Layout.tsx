import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import MainContent from "../mainContent/MainContent";
import { ThemeContext } from "../theme/ThemeContext";
import Hero from "../hero/Hero";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // const [mounted, setMounted] = useState(false);
  // const { darkMode } = React.useContext(ThemeContext);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  return (
    <div className="min-h-screen flex flex-col transition duration-500 text-theme-black dark:text-theme-white dark:bg-theme-black">
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </div>
  );
};

export default Layout;
