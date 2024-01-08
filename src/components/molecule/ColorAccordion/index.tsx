import React, { useEffect, useState } from 'react'
import tinycolor from 'tinycolor2'
import Accordion from '../../atoms/Accordion'
import ColorSelector from '../../atoms/ColorSelector'
import { Color, Colors, GreyColor } from '../../../theme'
import { ThemeState } from '../../../store/features/ThemeSlice'

interface ColorAccordionProps {
  colorName: string
  themeColors: Colors
  originalTheme: ThemeState
  setThemeColors: (themeColors: Colors) => void
}

const ColorAccordion: React.FC<ColorAccordionProps> = ({
  colorName,
  themeColors,
  originalTheme,
  setThemeColors
}) => {
  const variants = ['light', 'main', 'dark'] as (keyof GreyColor)[]

  if (colorName === 'grey') {
    variants.push('black')
    variants.unshift('white')
  }

  const [colors, setColors] = useState(originalTheme.theme.palette.colors[colorName as keyof Colors] as GreyColor | Color)

  const [isAutoColor, setIsAutoColor] = useState(true)
  const [contrastScale, setContrastScale] = useState(20)

  const originalVariantColors: GreyColor = originalTheme.theme.palette.colors[colorName as keyof Colors] as GreyColor

  const handleAutoColorChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIsAutoColor(event.target.checked)
  }

  useEffect(() => {
    if (isAutoColor) {
      const darkerColor = tinycolor(colors.main).darken(contrastScale).toString()
      const lighterColor = tinycolor(colors.main).lighten(contrastScale).toString()

      if (colorName === 'grey') {
        const darkestColor = tinycolor(darkerColor).clone().darken(contrastScale).toString()
        const lightestColor = tinycolor(lighterColor).clone().lighten(contrastScale).toString()

        setColors((prev) => ({
          ...prev,
          white: lightestColor,
          light: lighterColor,
          dark: darkerColor,
          black: darkestColor
        }))
      } else {
        setColors((prev) => ({
          ...prev,
          light: lighterColor,
          dark: darkerColor
        }))
      }
    }
  }, [colors.main, isAutoColor, contrastScale])

  useEffect(() => {
    setThemeColors({
      ...themeColors,
      [colorName]: {
        ...(themeColors[colorName as keyof Colors]),
        ...colors
      }
    })
  }, [colors])

  return (
    <Accordion label={colorName} color={originalVariantColors.main}>
      <label htmlFor={`auto-color-${colorName}`}>auto set color</label>
      <input id={`auto-color-${colorName}`} type="checkbox" checked={isAutoColor} onChange={handleAutoColorChange} />
      <label htmlFor={`auto-color-${colorName}-strength`}>Contrast</label>
      <input id={`auto-color-${colorName}-strength`} type="number" disabled={!isAutoColor} value={contrastScale} onChange={(e): void => { setContrastScale(parseInt(e.target.value)) }} />
      {variants.map((variant) => (
        <ColorSelector
          key={variant}
          disabled={isAutoColor && variant !== 'main'}
          color={(colors as GreyColor)[variant]}
          setColors={setColors}
          variant={variant}
        />
      ))}
    </Accordion>
  )
}

export default ColorAccordion
