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
    primary: Color,
    secondary: Color,
    tertiary?: Color,
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
    primary: {
      light: '#000000',
      main: '#008a52',
      dark: '#000000'
    },
    secondary: {
      light: '#000000',
      main: '#70bd91',
      dark: '#000000'
    },
    colors: {
      grey: {
        white: '#f5f5f5',
        light: '#aeaeae',
        main: '#888888',
        dark: '#474747',
        black: '#212121'
      } as GreyColor,
      success: {
        light: '#000000',
        main: '#70bd91',
        dark: '#071126'
      },
      error: {
        light: '#000000',
        main: '#c52425',
        dark: '#000000'
      },
      warning: {
        light: '#000000',
        main: '#fac900',
        dark: '#000000'
      },
      red: {
        light: '#dd3333',
        main: '#d50000',
        dark: '#950000'
      },
      green: {
        light: '#94d1b4',
        main: '#008a52',
        dark: '#000000'
      },
      blue: {
        light: '#000000',
        main: '#243853',
        dark: '#071126'
      },
      pink: {
        light: '#000000',
        main: '#DE3163',
        dark: '#000000'
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
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 28
  }
}
