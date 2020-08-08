import React from 'react';
import App from "../App";
import ThemeState from "../context/theme/themeState";
import { render, cleanup, fireEvent } from "@testing-library/react";

afterEach(cleanup);

describe('App Tests', () => {
    it('should execute test', () => {
        expect(1).toEqual(1);
    });

    it('should change the theme', () => {
        const { getByTestId } = render(<ThemeState><App /></ThemeState>);
        fireEvent.click(getByTestId("theme-switch"));
        expect(document.body.classList.contains('dark')).toBeTruthy();
        fireEvent.click(getByTestId("theme-switch"));
        expect(document.body.classList.contains('dark')).toBeFalsy();
    });
});