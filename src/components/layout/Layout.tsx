import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import MainContent from "../mainContent/MainContent";
import { ThemeContext } from "../theme/themeContext/ThemeContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const { darkMode } = React.useContext(ThemeContext);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <div
      className={`min-h-screen bg-lightPattern transition duration-500 dark:text-gray-200 dark:bg-darkPattern`}
    >
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </div>
  ) : null;
};

export default Layout;
