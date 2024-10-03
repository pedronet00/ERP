import { createTheme } from "@mui/material/styles";
import typography from "./Typography";
import { shadows } from "./Shadows";

// Tema claro (já definido)
const baselightTheme = createTheme({
  direction: 'ltr',
  palette: {
    primary: {
      main: '#5D87FF',
      light: '#ECF2FF',
      dark: '#4570EA',
    },
    secondary: {
      main: '#49BEFF',
      light: '#E8F7FF',
      dark: '#23afdb',
    },
    success: {
      main: '#13DEB9',
      light: '#E6FFFA',
      dark: '#02b3a9',
      contrastText: '#ffffff',
    },
    info: {
      main: '#539BFF',
      light: '#EBF3FE',
      dark: '#1682d4',
      contrastText: '#ffffff',
    },
    error: {
      main: '#FA896B',
      light: '#FDEDE8',
      dark: '#f3704d',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#FFAE1F',
      light: '#FEF5E5',
      dark: '#ae8e59',
      contrastText: '#ffffff',
    },
    purple: {
      A50: '#EBF3FE',
      A100: '#6610f2',
      A200: '#557fb9',
    },
    grey: {
      100: '#F2F6FA',
      200: '#EAEFF4',
      300: '#DFE5EF',
      400: '#7C8FAC',
      500: '#5A6A85',
      600: '#2A3547',
    },
    text: {
      primary: '#2A3547',
      secondary: '#5A6A85',
    },
    action: {
      disabledBackground: 'rgba(73,82,88,0.12)',
      hoverOpacity: 0.02,
      hover: '#f6f9fc',
    },
    divider: '#e5eaef',
  },
  typography,
  shadows,
});

// Tema escuro (novo)
const basedarkTheme = createTheme({
  direction: 'ltr',
  palette: {
    mode: 'dark', // Define o modo dark
    primary: {
      main: '#5D87FF',
      light: '#ECF2FF',
      dark: '#4570EA',
    },
    secondary: {
      main: '#49BEFF',
      light: '#E8F7FF',
      dark: '#23afdb',
    },
    success: {
      main: '#13DEB9',
      light: '#1D5C6B',
      dark: '#02b3a9',
      contrastText: '#ffffff',
    },
    info: {
      main: '#539BFF',
      light: '#1D283A',
      dark: '#1682d4',
      contrastText: '#ffffff',
    },
    error: {
      main: '#FA896B',
      light: '#3E2C2B',
      dark: '#f3704d',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#FFAE1F',
      light: '#3E2F1D',
      dark: '#ae8e59',
      contrastText: '#ffffff',
    },
    purple: {
      A50: '#40344A',
      A100: '#6610f2',
      A200: '#7B59C4',
    },
    grey: {
      100: '#1E1E2F',
      200: '#2B2B40',
      300: '#404050',
      400: '#7C8FAC',
      500: '#A9B7D0',
      600: '#EAEFF4',
    },
    background: {
      default: '#121212', // Cor de fundo escura
      paper: '#1E1E2F', // Fundo de componentes como cards
    },
    text: {
      primary: '#EAEFF4',
      secondary: '#A9B7D0',
    },
    action: {
      disabledBackground: 'rgba(255,255,255,0.12)',
      hoverOpacity: 0.1,
      hover: '#333',
    },
    divider: '#404050',
  },
  typography,
  shadows,
});

export { baselightTheme, basedarkTheme };
