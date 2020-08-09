import { createContext } from "react";
import { LIGHT_THEME } from "../../app.constants";
import { ThemeContextType } from "./interface";



const ThemeContext: React.Context<ThemeContextType> = createContext<ThemeContextType>({
    theme: LIGHT_THEME,
    toggleTheme: () => { }
});

export default ThemeContext;