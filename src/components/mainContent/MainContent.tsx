import React from 'react';

const MainContent: React.FunctionComponent = ({ children }) => {
  return <main className="mx-auto h-full w-full">{children}</main>;
};

export default MainContent;
