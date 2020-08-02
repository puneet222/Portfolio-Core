import React, { useState } from 'react';
import { Button } from 'antd';
import './App.scss';
import { LIGHT_THEME, DARK_THEME } from './app.constants';

declare global {
  interface Window {
    less: any;
  }
}

const App = () => {

  const [theme, setTheme] = useState(LIGHT_THEME)

  const toggleTheme = () => {
    if (theme === LIGHT_THEME) {
      document.body.classList.add('dark');
      setTheme(DARK_THEME);
    } else {
      document.body.classList.remove('dark');
      setTheme(LIGHT_THEME)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>Testing 1 2 3</h3>
        <Button type="primary" onClick={toggleTheme}>Button</Button>
      </header>
    </div >
  );
}

export default App;
