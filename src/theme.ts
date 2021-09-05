import { createTheme, PaletteType } from '@material-ui/core';

export const theme = {
  palette: {
    type: 'dark' as PaletteType,
    primary: {
      light: '#8bdf68',
      main: '#6ed843',
      dark: '#4d972e',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
  },
};

export default createTheme(theme);
