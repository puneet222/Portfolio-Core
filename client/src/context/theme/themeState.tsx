import React, { useReducer } from "react";
import ThemeReducer from './themeReducer';
import { LIGHT_THEME } from "../../app.constants"
import { TOGGLE_THEME } from "../types";
import ThemeContext from "./themeContext";

const ThemeState = (props: any) => {
    const initialState: string = LIGHT_THEME;

    const [state, dispatch] = useReducer(ThemeReducer, initialState);

    const toggleTheme = () => {
        dispatch({
            type: TOGGLE_THEME
        });
    }

    return (
        <ThemeContext.Provider
            value={{
                theme: state,
                toggleTheme
            }}
        >
            {props.children}
        </ThemeContext.Provider>
    )

}

export default ThemeState;