import React from 'react';
import Footer from '../footer/Footer';

const HomepageLayout: React.FC = ({ children }) => {
  return (
    <>
      <main className="h-full">{children}</main>
      <Footer />
    </>
  );
};

export default HomepageLayout;
