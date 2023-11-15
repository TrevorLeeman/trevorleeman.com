import React, { PropsWithChildren } from 'react';
import Footer from '../footer/Footer';

const HomepageLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main className="h-full">{children}</main>
      <Footer />
    </>
  );
};

export default HomepageLayout;
