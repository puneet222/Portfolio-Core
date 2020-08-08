import React, { useContext, useEffect } from 'react';
import { Switch } from 'antd';
import { StarFilled, BulbFilled } from '@ant-design/icons';
import './App.scss';
import { LIGHT_THEME, DARK_THEME } from './app.constants';
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
      <div className="theme-toggle">
        <Switch
          checkedChildren={<StarFilled className="star-text" />}
          unCheckedChildren={<BulbFilled className="bulb-text" />}
          onClick={changeTheme}
          className={theme === DARK_THEME ? "dark-background" : ""}
          data-testid="theme-switch"
        />
      </div>
      <p>Current {theme}</p>
    </div >
  );
}

export default App;
