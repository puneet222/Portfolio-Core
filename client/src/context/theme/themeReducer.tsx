import { DefaultAction } from "./interface";
import { TOGGLE_THEME } from "../types";
import { LIGHT_THEME, DARK_THEME } from "../../app.constants";

const ThemeReducer = (state: string, action: DefaultAction): string => {
    switch (action.type) {
        case TOGGLE_THEME: {
            return state === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
        }
        default: {
            return LIGHT_THEME
        }
    }
}

export default ThemeReducer;