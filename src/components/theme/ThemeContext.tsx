import React from "react";
import useDarkMode from "../../hooks/useDarkMode";

type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: (enabled: boolean) => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  darkMode: false,
  setDarkMode: () => {},
});

export const ThemeProvider: React.FunctionComponent = ({ children }) => {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
