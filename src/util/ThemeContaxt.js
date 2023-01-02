// import createContext and useState
import React, {createContext, useEffect, useState} from 'react';
import Theme from '../Theme';
import {EventRegister} from './EventRegister';

// Initiate and expport ThemeContext
export const ThemeContext = createContext();

// Initiate and expport ThemeProvider
export const ThemeProvider = ({children}) => {
  // Manage themeMode state
  // Theme has a two value 'light' & 'dark'
  const [themeMode, setThemeMode] = useState('light');

  useEffect(() => {
    let eventListener = EventRegister.addEventListener('ChangeTheme', data => {
      setThemeMode(data ? 'dark' : 'light');
    });

    return () => {
      EventRegister.removeAllListeners(eventListener);
    };
  });

  const toggelTheme = () => {
    if (themeMode === 'light') {
      setThemeMode('dark');
    } else {
      setThemeMode('light');
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        theme: themeMode === 'dark' ? Theme.dark : Theme.light,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
