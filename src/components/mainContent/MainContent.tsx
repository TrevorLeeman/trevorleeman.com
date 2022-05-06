import React from "react";

const MainContent: React.FunctionComponent = ({ children }) => {
  return (
    <main className="flex w-full max-w-screen-xl mx-auto flex-grow">
      {children}
    </main>
  );
};

export default MainContent;
