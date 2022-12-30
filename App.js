import React from 'react';
import Navigation from './src/Navigators/Navigation';
import {ThemeProvider} from './src/util/ThemeContaxt';

const App = () => {
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
};

export default App;
