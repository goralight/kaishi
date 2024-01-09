import { Color, Colors, StandardTheme } from '../../../theme'

interface GetColorReturn {
  backgroundColor: string;
  hoverColor: string;
  fontColor: string;
}

export const getColor = (theme: StandardTheme, color: keyof Colors, colorVariant: keyof Color): GetColorReturn => {
  const themeColor = (theme.palette.colors[color] as Color)
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
    default:
      hoverColor = backgroundColor
      break
  }

  const fontColor: string = theme.palette.colors.foreground.main

  return {
    backgroundColor,
    hoverColor,
    fontColor
  }
}
