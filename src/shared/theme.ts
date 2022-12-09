const Breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440,
  xxxl: 1920
};

export const breakpoint = (n: keyof typeof Breakpoints): string => `@media (min-width: ${Breakpoints[n]}px)`;

export const pxToRem = (pxValue: number, baseFontSize: number): string => `${pxValue / baseFontSize || 16}rem`;

const palette = {
  common: {
    black: '#000',
    white: '#fff'
  },
  border: {
    header: '#7e7e7e',
    title: '#161b22',
    content: '#7e7e7e'
  },
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    contrastText: '#fff'
  },
  secondary: {
    main: '#9c27b0',
    light: '#ba68c8',
    dark: '#7b1fa2',
    contrastText: '#fff'
  },
  success: {
    main: '#2e7d32',
    light: '#4caf50',
    dark: '#1b5e20',
    contrastText: '#fff'
  },
  warning: {
    main: '#ed6c02',
    light: '#ff9800',
    dark: '#e65100',
    contrastText: '#fff'
  },
  error: {
    main: '#d32f2f',
    light: '#ef5350',
    dark: '#c62828',
    contrastText: '#fff'
  },
  info: {
    main: '#0288d1',
    light: '#03a9f4',
    dark: '#01579b',
    contrastText: '#fff'
  },
  grey: {
    50: '#fcfcfc',
    100: '#ebebeb',
    200: '#cccccc',
    300: '#a0a0a0',
    400: '#8e8e8e',
    500: '#666666',
    600: '#505050',
    700: '#404040',
    800: '#303030',
    900: '#212121'
  },
  color: {
    text: '#262728',
    subText: '#535353',
    textInvert: '#e4e4e4',
    subTextInvert: '#6d6e6f'
  },
  bg: {
    main: '#eeeeee',
    mainContent: '#e4e4e4',
    modal: '#333',
    modalContent: '#444',
    highlight: '#6db6ff'
  },
  text: {
    primaryLight: '#cccccc',
    primary: '#666666',
    primaryDark: '#212121',
    secondary: 'rgba(0, 0, 0, 0.6)',
    disabled: 'rgba(0, 0, 0, 0.87)'
  },
  divider: '#cccccc'
};

const paletteDark = {
  bg: {
    main: '#1e1f20',
    mainContent: '#121314',
    modal: '#333',
    modalContent: '#444',
    highlight: '#f65341'
  },
  border: {
    header: '#474747',
    title: '#6c757d',
    content: '#474747'
  },
  color: {
    text: '#e4e4e4',
    subText: '#888888',
    textInvert: '#e4e4e4',
    subTextInvert: '#6d6e6f'
  }
};

const paletteBlue = {
  bg: {
    main: '#0d1117',
    mainContent: '#161b22',
    modal: '#1b222c',
    modalContent: '#141d27',
    highlight: '#6db6ff'
  },
  border: {
    header: '#161b22',
    title: '#5d6a7e',
    content: '#161b22'
  },
  color: {
    text: '#e4e4e4',
    subText: '#6d6e6f',
    textInvert: '#e4e4e4',
    subTextInvert: '#6d6e6f'
  }
};

const typography = {
  htmlFontSize: 16,
  htmlFontSizeSm: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700
};

const spacing = [
  pxToRem(0, typography.htmlFontSize),
  pxToRem(4, typography.htmlFontSize),
  pxToRem(8, typography.htmlFontSize),
  pxToRem(12, typography.htmlFontSize),
  pxToRem(16, typography.htmlFontSize),
  pxToRem(20, typography.htmlFontSize),
  pxToRem(24, typography.htmlFontSize),
  pxToRem(28, typography.htmlFontSize),
  pxToRem(32, typography.htmlFontSize),
  pxToRem(36, typography.htmlFontSize),
  pxToRem(40, typography.htmlFontSize),
  pxToRem(44, typography.htmlFontSize),
  pxToRem(48, typography.htmlFontSize),
  pxToRem(52, typography.htmlFontSize),
  pxToRem(56, typography.htmlFontSize),
  pxToRem(60, typography.htmlFontSize),
  pxToRem(64, typography.htmlFontSize),
  pxToRem(68, typography.htmlFontSize),
  pxToRem(72, typography.htmlFontSize),
  pxToRem(76, typography.htmlFontSize),
  pxToRem(80, typography.htmlFontSize),
  pxToRem(84, typography.htmlFontSize),
  pxToRem(88, typography.htmlFontSize),
  pxToRem(92, typography.htmlFontSize),
  pxToRem(96, typography.htmlFontSize),
  pxToRem(100, typography.htmlFontSize)
];

const borderRadius = {
  none: 0,
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
  xxxl: '64px',
  round: '50%',
  full: '999px'
};

const shadow = {
  0: 'none',
  1: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
};

const transitions = {
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 0.2, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },
  duration: {
    shortest: '150ms',
    shorter: '200ms',
    short: '250ms',
    standard: '300ms',
    complex: '375ms',
    enteringScreen: '225ms',
    leavingScreen: '195ms'
  }
};

export const theme = {
  palette,
  spacing,
  borderRadius,
  shadow,
  typography,
  transitions
};

export type ThemeTypes = typeof theme;

export const themeDark: ThemeTypes = {
  ...theme,
  palette: {
    ...theme.palette,
    ...paletteDark
  }
};

export const themeBlue: ThemeTypes = {
  ...theme,
  palette: {
    ...theme.palette,
    ...paletteBlue
  }
};
