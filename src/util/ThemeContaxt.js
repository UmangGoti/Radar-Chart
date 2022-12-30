// import createContext and useState
import React, {createContext, useState} from 'react';

// Initiate and expport ThemeContext
export const ThemeContext = createContext();

// Initiate and expport ThemeProvider
export const ThemeProvider = ({children}) => {
  // Manage theme state
  // Theme has a two value 'light' & 'dark'
  const [theme, setTheme] = useState('light');

  const toggelTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <ThemeContext.Provider value={{theme, toggelTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
