export interface Sizing {
  sm: number
  md: number
  lg: number
}

export interface ExtraSizing extends Sizing {
  xxs: number
  xs: number
  xl: number
  xxl: number
}

export interface Color {
  light: string
  main: string
  dark: string
}

export interface Colors {
  background: Color
  foreground: Color
  primary: Color
  secondary: Color
  tertiary: Color
  success: Color
  warning: Color
  error: Color
  disabled: Color
  // add more if needed
}

export interface Palette {
  mode: 'light' | 'dark'
  colors: Colors
}

export interface StandardTheme {
  palette: Palette,
  border: {
    width: Sizing
    radius: number
  },
  spacing: ExtraSizing
}

export const standThemePalette: Palette = {
  mode: 'dark',
  colors: {
    background: {
      light: '#666666',
      main: '#444444',
      dark: '#222222'
    },
    foreground: {
      light: '#ffffff',
      main: '#eeeeee',
      dark: '#bbbbbb'
    },
    primary: {
      light: '#ababcf',
      main: '#7474b0',
      dark: '#454569'
    },
    secondary: {
      light: '#cfabab',
      main: '#B07474',
      dark: '#694545'
    },
    tertiary: {
      light: '#abcfab',
      main: '#74B074',
      dark: '#456945'
    },
    success: {
      light: '#a4ca9a',
      main: '#68A857',
      dark: '#3e6434'
    },
    error: {
      light: '#ff3d41',
      main: '#ff0000',
      dark: '#c80004'
    },
    warning: {
      light: '#ffe505',
      main: '#ffc905',
      dark: '#ffa505'
    },
    disabled: {
      light: '#666666',
      main: '#444444',
      dark: '#222222'
    }
  }
}

export const standardTheme: StandardTheme = {
  palette: standThemePalette,
  border: {
    width: {
      sm: 1,
      md: 2,
      lg: 4
    },
    radius: 2
  },
  spacing: {
    xxs: 8,
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
    xxl: 32
  }
}
