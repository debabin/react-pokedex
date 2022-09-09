import React from 'react';

import { ThemeContext } from './ThemeContex';

export const useTheme = () => {
  const themeContext = React.useContext(ThemeContext);
  return { ...themeContext };
};
