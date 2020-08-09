import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import { LIGHT_THEME } from './app.constants';
import ThemeContext from './context/theme/ThemeContext';
import AuthState from './context/auth/AuthState';
import ThemeToggle from './components/theme/ThemeToggle';
import { Register } from './components/auth/Register';

const App = () => {

  const themeContext = useContext(ThemeContext);

  const { theme } = themeContext;

  useEffect(() => {
    if (theme === LIGHT_THEME) {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
  });

  return (
    <AuthState>
      <Router>
        <div className="App">
          <ThemeToggle />
          <p>Current {theme}</p>
          <div className="container">
            <Switch>
              <Route exact path="/register" component={Register} />
            </Switch>
          </div>
        </div >
      </Router>
    </AuthState>
  );
}

export default App;
