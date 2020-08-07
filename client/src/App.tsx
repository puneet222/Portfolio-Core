import React, { useContext } from 'react';
import { Button } from 'antd';
import './App.scss';
import { LIGHT_THEME } from './app.constants';
import ThemeContext from './context/theme/themeContext';

declare global {
  interface Window {
    less: any;
  }
}

const App = () => {

  const themeContext = useContext(ThemeContext);

  const { theme, toggleTheme } = themeContext;

  // const [theme, setTheme] = useState(LIGHT_THEME)

  const changeTheme = () => {
    if (theme === LIGHT_THEME) {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
    toggleTheme();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>Testing 1 2 3</h3>
        <Button type="ghost" onClick={changeTheme}>Test</Button>
      </header>
    </div >
  );
}

export default App;
