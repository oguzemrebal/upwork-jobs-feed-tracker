import { createTheme } from '@material-ui/core';

export const colors = {
  primary: {
    light: '#636363',
    main: '#3c3c3c',
    dark: '#2a2a2a',
    contrastText: '#fff',
  },
  secondary: {
    light: '#8bdf68',
    main: '#6ed843',
    dark: '#4d972e',
    contrastText: '#000',
  },
};

export const theme = {
  palette: {
    ...colors,
    background: {
      default: colors.primary.light,
    },
  },
};

export default createTheme(theme);
