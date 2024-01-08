import React, { useEffect, useState } from 'react'
import tinycolor from 'tinycolor2'
import Accordion from '../../atoms/Accordion'
import ColorSelector, { ColorSelectorRef } from '../../atoms/ColorSelector'
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
  const [strength, setStrength] = useState(15)

  const variantColors: GreyColor = originalTheme.theme.palette.colors[colorName as keyof Colors] as GreyColor
  const currentVariantColors: GreyColor = themeColors[colorName as keyof Colors] as GreyColor

  const handleAutoColorChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIsAutoColor(event.target.checked)
  }

  // useEffect(() => {
  //   const toChange = {
  //     ...themeColors,
  //     [colorName]: {
  //       ...(themeColors[colorName as keyof Colors]),
  //       ...colors
  //     }
  //   }
  //   console.log('toChange!', toChange)
  //   setThemeColors(toChange)
  // }, [colors])

  useEffect(() => {
    if (isAutoColor) {
      const darkerColor = tinycolor(currentVariantColors.main).darken(strength).toString()
      const lighterColor = tinycolor(currentVariantColors.main).lighten(strength).toString()

      if (colorName === 'grey') {
        const darkestColor = tinycolor(darkerColor).darken(strength).toString()
        const lightestColor = tinycolor(lighterColor).lighten(strength).toString()

        setColors({
          white: lightestColor,
          light: lighterColor,
          main: currentVariantColors.main,
          dark: darkerColor,
          black: darkestColor
        })
      } else {
        setColors({
          light: lighterColor,
          main: currentVariantColors.main,
          dark: darkerColor
        })
      }
    } else {
      const toChange = {
        ...themeColors,
        [colorName]: {
          ...(themeColors[colorName as keyof Colors]),
          ...colors
        }
      }
      console.log('toChange!', toChange)
      setThemeColors(toChange)
    }
  }, [colors, isAutoColor, strength])

  return (
    <Accordion label={colorName} color={variantColors.main}>
      <label htmlFor={`auto-color-${colorName}`}>auto set color</label>
      <input id={`auto-color-${colorName}`} type="checkbox" checked={isAutoColor} onChange={handleAutoColorChange} />
      <label htmlFor={`auto-color-${colorName}-strength`}>strength</label>
      <input id={`auto-color-${colorName}-strength`} type="number" value={strength} onChange={(e): void => { setStrength(parseInt(e.target.value)) }} />
      {variants.map((variant) => (
        <ColorSelector
          disabled={isAutoColor && variant !== 'main'}
          key={variant}
          color={(colors as GreyColor)[variant]}
          setColors={setColors}
          variantColors={variantColors}
          setThemeColors={setThemeColors}
          themeColors={themeColors}
          variant={variant}
          colorName={colorName}
        />
      ))}
    </Accordion>
  )
}

export default ColorAccordion
