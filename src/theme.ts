export interface Color {
  light: string
  main: string
  dark: string
}

export interface GreyColor extends Color {
  white: string
  black: string
}

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

export interface Colors {
  grey: GreyColor
  primary: Color
  secondary: Color
  tertiary: Color
  success: Color
  error: Color
  warning: Color
  red: Color
  green: Color
  blue: Color
  pink: Color
  // add more if needed
}

export interface StandardTheme {
  palette: {
    mode: 'light' | 'dark'
    colors: Colors
  },
  border: {
    width: Sizing
    radius: Sizing
  },
  spacing: ExtraSizing
}

export const standardTheme: StandardTheme = {
  palette: {
    mode: 'dark',
    colors: {
      grey: {
        white: '#f5f5f5',
        light: '#888888',
        main: '#555555',
        dark: '#333333',
        black: '#111111'
      } as GreyColor,
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
      red: {
        light: '#f85953',
        main: '#f5120a',
        dark: '#930a06'
      },
      green: {
        light: '#b5e550',
        main: '#abc32f',
        dark: '#607c3c'
      },
      blue: {
        light: '#98bccc',
        main: '#5490AB',
        dark: '#325666'
      },
      pink: {
        light: '#df858d',
        main: '#CB3441',
        dark: '#791f27'
      }
    }
  },
  border: {
    width: {
      sm: 1,
      md: 2,
      lg: 4
    },
    radius: {
      sm: 8,
      md: 16,
      lg: 24
    }
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
