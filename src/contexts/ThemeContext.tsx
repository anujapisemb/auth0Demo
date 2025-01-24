import React, {useContext} from 'react';
import {ThemeOptions} from '../types/types';
import {colors} from '../theme/colors';

interface ThemeContextType {
    theme: ThemeOptions;
    setTheme: (key: ThemeOptions) => void;
    themeColors: (typeof colors)[ThemeOptions.dark];
}

const initialContext: ThemeContextType = {
    theme: ThemeOptions.dark,
    setTheme: () => {},
    themeColors: colors[ThemeOptions.dark],
};

const ThemeContext = React.createContext<ThemeContextType>(initialContext);

const useTheme = () => {
    return useContext(ThemeContext);
};

const ThemeProvider = ({children}: {children: React.ReactNode}) => {
    const [theme, setThemeState] = React.useState<ThemeOptions>(ThemeOptions.dark);
    const themeColors = colors[theme];

    const setTheme = (value: ThemeOptions) => {
        setThemeState(value);
    };
    return <ThemeContext.Provider value={{theme: theme, setTheme: setTheme, themeColors: themeColors}}>{children}</ThemeContext.Provider>;
};

export {ThemeProvider, ThemeOptions, useTheme};
