import React, { useContext, useEffect } from 'react';
import { Button } from 'antd';
import './App.scss';
import { LIGHT_THEME } from './app.constants';
import ThemeContext from './context/theme/themeContext';

const App = () => {

  const themeContext = useContext(ThemeContext);

  const { theme, toggleTheme } = themeContext;

  useEffect(() => {
    if (theme === LIGHT_THEME) {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
  });

  const changeTheme = () => {
    toggleTheme();
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Current {theme}</p>
        <Button type="ghost" onClick={changeTheme}>Test</Button>
      </header>
    </div >
  );
}

export default App;
