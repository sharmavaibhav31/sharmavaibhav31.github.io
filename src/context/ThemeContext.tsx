import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextValue {
    isDark: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
    isDark: false,
    toggleTheme: () => { },
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDark, setIsDark] = useState<boolean>(() => {
        try {
            const savedTheme = localStorage.getItem('portfolio-theme');
            return savedTheme !== 'light';
        } catch {
            return true;
        }
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            root.classList.remove('light');
            root.removeAttribute('data-theme');
            localStorage.setItem('portfolio-theme', 'dark');
        } else {
            root.classList.remove('dark');
            root.classList.add('light');
            root.setAttribute('data-theme', 'light');
            localStorage.setItem('portfolio-theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark((prev) => !prev);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
