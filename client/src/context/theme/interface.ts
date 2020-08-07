export interface DefaultAction {
    type: string
}

export interface ThemeContextType {
    theme: string,
    toggleTheme: () => void
}