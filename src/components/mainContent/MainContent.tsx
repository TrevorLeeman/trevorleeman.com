import React from "react";

const MainContent: React.FunctionComponent = ({ children }) => {
  return <main className="w-full max-w-screen-xl mx-auto">{children}</main>;
};

export default MainContent;
