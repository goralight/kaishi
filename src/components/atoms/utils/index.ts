import { Colors, GreyColor, StandardTheme } from '../../../theme'

interface GetColorReturn {
  backgroundColor: string;
  hoverColor: string;
  fontColor: string;
}

export const getColor = (theme: StandardTheme, color: keyof Colors, colorVariant: keyof GreyColor): GetColorReturn => {
  const themeColor = (theme.palette.colors[color] as GreyColor)
  const backgroundColor = themeColor[colorVariant]

  if (!backgroundColor) {
    throw new Error(
      `Color: ${color} with colorVariant: ${colorVariant} does not exist. Check the theme.`
    )
  }

  let hoverColor
  switch (colorVariant) {
    case 'main':
      hoverColor = themeColor.dark
      break
    case 'light':
      hoverColor = themeColor.main
      break
    case 'dark':
      hoverColor = themeColor.main
      break
    case 'white':
      hoverColor = themeColor.light
      break
    case 'black':
      hoverColor = themeColor.dark
      break
    default:
      hoverColor = backgroundColor
      break
  }

  let fontColor: string
  if (color === 'grey' && colorVariant === 'white') {
    fontColor = 'black'
  } else if (color === 'grey' && colorVariant === 'black') {
    fontColor = 'white'
  } else if (theme.palette.mode === 'dark') {
    fontColor = 'white'
  } else {
    fontColor = 'black'
  }

  return {
    backgroundColor,
    hoverColor,
    fontColor
  }
}
