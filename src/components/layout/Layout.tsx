import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import MainContent from '../mainContent/MainContent';
import DarkModeDefaults from './DarkModeDefaults';

const Layout: React.FC = ({ children }) => {
  return (
    <DarkModeDefaults>
      <div className="flex min-h-screen flex-col">
        <Header />
        <MainContent>{children}</MainContent>
      </div>
      <Footer />
    </DarkModeDefaults>
  );
};

export default Layout;
