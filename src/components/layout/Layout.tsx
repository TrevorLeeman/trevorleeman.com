import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import MainContent from "../mainContent/MainContent";
import useDarkMode from "../../hooks/useDarkMode";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // const [darkMode, _] = useDarkMode();
  // console.log(darkMode);

  return (
    <div className={`bg-lightPattern min-h-screen dark:bg-darkPattern`}>
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </div>
  );
};

export default Layout;
