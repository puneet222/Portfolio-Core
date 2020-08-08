import ThemeReducer from "../../../context/theme/themeReducer";
import { LIGHT_THEME, DARK_THEME } from "../../../app.constants";
import { TOGGLE_THEME } from "../../../context/types";
import { DefaultAction } from "../../../context/theme/interface";

describe('Theme Context Tests [Reducer]', () => {
    it('should toggle the theme', () => {
        let toggleAction: DefaultAction = {
            type: TOGGLE_THEME
        }
        expect(ThemeReducer(LIGHT_THEME, toggleAction)).toEqual(DARK_THEME);
        expect(ThemeReducer(DARK_THEME, toggleAction)).toEqual(LIGHT_THEME);
    });
});