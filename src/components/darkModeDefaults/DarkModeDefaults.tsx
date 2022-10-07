import React, { useEffect, useState } from 'react';

const DarkModeDefaults: React.FC = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`flex flex-col bg-theme-white text-theme-black ${
        mounted ? 'transition duration-200' : ''
      } dark:bg-theme-black dark:text-theme-white`}
    >
      {children}
    </div>
  );
};

export default DarkModeDefaults;
