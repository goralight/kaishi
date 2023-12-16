interface Color {
  light?: string
  main: string
  dark?: string
}

interface GreyColor extends Color {
  white: string
  black: string
}

interface OrdinalColor {
  pastel?: string
  main: string
  muted?: string
}

export interface StandardTheme {
  palette: {
    primary: OrdinalColor,
    secondary: OrdinalColor,
    tertiary?: OrdinalColor,
    state?: {
      success: string,
      error: string,
      warning: string,
    },
    colors: {
      grey: GreyColor
      red: Color
      green: Color
      blue: Color
    } & Record<string, Color>,
  },
}

// todo: add more theme properties; font, spacing, border, etc.

export const standardTheme: StandardTheme = {
  palette: {
    primary: {
      main: '#008a52'
    },
    secondary: {
      main: '#70bd91'
    },
    state: {
      success: '#70bd91',
      error: '#c52425',
      warning: '#fac900'
    },
    colors: {
      grey: {
        white: '#f5f5f5',
        light: '#aeaeae',
        main: '#bdbdbd',
        dark: '#757575',
        black: '#212121'
      } as GreyColor,
      red: {
        light: '#9a360e',
        main: '#ff4600',
        dark: '#c52425'
      },
      green: {
        light: '#94d1b4',
        main: '#008a52'
      },
      blue: {
        main: '#243853',
        dark: '#071126'
      },
    }
  }
}
