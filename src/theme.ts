import { createTheme, PaletteType } from '@material-ui/core';

export const colors = {
  primary: {
    light: '#8bdf68',
    main: '#6ed843',
    dark: '#4d972e',
    contrastText: '#000',
  },
};

export const theme = {
  palette: {
    type: 'dark' as PaletteType,
    ...colors,
  },
};

export default createTheme(theme);
