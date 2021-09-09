import {
  PaletteType,
  createTheme,
  unstable_createMuiStrictModeTheme,
} from '@material-ui/core';

import { isProduction } from './utils/environment';

export const themeConfig = {
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

const theme = isProduction()
  ? createTheme(themeConfig)
  : unstable_createMuiStrictModeTheme(themeConfig);

export default theme;
