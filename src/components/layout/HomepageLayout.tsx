import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import MainContent from '../mainContent/MainContent';
import DarkModeDefaults from '../darkModeDefaults/DarkModeDefaults';

const HomepageLayout: React.FC = ({ children }) => {
  return (
    <DarkModeDefaults>
      <MainContent>{children}</MainContent>
      <Footer />
    </DarkModeDefaults>
  );
};

export default HomepageLayout;
