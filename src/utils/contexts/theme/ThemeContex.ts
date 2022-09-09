import React from 'react';

export interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const INITIAL_THEME: Theme = (localStorage.getItem('pokedex-theme') as Theme) || 'dark';

export const ThemeContext = React.createContext<ThemeContextProps>({
  theme: INITIAL_THEME,
  setTheme: () => {}
});
