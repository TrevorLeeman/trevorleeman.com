import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <div className="flex min-h-full flex-col">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
