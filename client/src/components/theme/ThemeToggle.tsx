import React, { useContext } from 'react'
import { Switch } from 'antd';
import { StarFilled, BulbFilled } from '@ant-design/icons';
import ThemeContext from '../../context/theme/ThemeContext';
import { DARK_THEME } from '../../app.constants';

const ThemeToggle = () => {

    const themeContext = useContext(ThemeContext);

    const { theme, toggleTheme } = themeContext;

    const changeTheme = () => {
        toggleTheme();
    }

    return (
        <div className="theme-toggle">
            <Switch
                checkedChildren={<StarFilled className="star-text" />}
                unCheckedChildren={<BulbFilled className="bulb-text" />}
                onClick={changeTheme}
                className={theme === DARK_THEME ? "dark-background" : ""}
                data-testid="theme-switch"
            />
        </div>
    )
}

export default ThemeToggle;
