import { createContext, useState } from "react";
export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(() => {
        return localStorage.getItem('theme') === 'light' ? false : true
    });

    const toggleTheme = () => {
        setDarkTheme(!darkTheme)
        localStorage.setItem('theme', darkTheme ? 'light' : 'dark')
    }

    const themeInfo = {
        toggleTheme,
        darkTheme
    }

    return (
        <ThemeContext.Provider value={themeInfo}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;