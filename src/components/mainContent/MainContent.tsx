import React from 'react';

const MainContent: React.FunctionComponent = ({ children }) => {
  return (
    <main className="min-h-inherit mx-auto flex w-full max-w-screen-xl flex-grow flex-col justify-center">
      {children}
    </main>
  );
};

export default MainContent;
