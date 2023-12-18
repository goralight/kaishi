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

interface Sizing {
  sm: number
  md: number
  lg: number
}

interface ExtraSizing extends Sizing {
  xxs: number
  xs: number
  xl: number
  xxl: number
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
  border: {
    width: Sizing
    radius: Sizing
  },
  spacing: ExtraSizing
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
      pink: {
        main: '#DE3163'
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
