import React, { useEffect, useState } from 'react'
import tinycolor from 'tinycolor2'
import Accordion from '../../atoms/Accordion'
import ColorSelector from '../../atoms/ColorSelector'
import { Color, Colors } from '../../../theme'
import { ThemeState } from '../../../store/features/storedThemeSlice'
import Checkbox from '../../atoms/Checkbox'

interface ColorAccordionProps {
  colorName: keyof Colors
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
  const variants = ['light', 'main', 'dark'] as const
  const label = colorName.charAt(0).toUpperCase() + colorName.slice(1)

  const [colors, setColors] = useState(originalTheme.theme.palette.colors[colorName as keyof Colors] as Color)

  const [isAutoColor, setIsAutoColor] = useState(true)
  const [contrastScale, setContrastScale] = useState(20)

  // const originalVariantColors: Color = originalTheme.theme.palette.colors[colorName as keyof Colors] as Color
  // console.log('originalVariantColors', originalVariantColors)

  const handleAutoColorChange = (): void => {
    setIsAutoColor(!isAutoColor)
  }

  useEffect(() => {
    if (isAutoColor) {
      const darkerColor = tinycolor(colors.main).darken(contrastScale).toString()
      const lighterColor = tinycolor(colors.main).lighten(contrastScale).toString()
      setColors((prev) => ({
        ...prev,
        light: lighterColor,
        dark: darkerColor
      }))
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
    <Accordion label={label} color={colorName}>
      <Checkbox checked={isAutoColor} onChange={handleAutoColorChange} label='auto set color' />
      <label htmlFor={`auto-color-${colorName}-strength`}>Contrast</label>
      <input id={`auto-color-${colorName}-strength`} type="number" disabled={!isAutoColor} value={contrastScale} onChange={(e): void => { setContrastScale(parseInt(e.target.value)) }} />
      {variants.map((variant) => (
        <ColorSelector
          key={variant}
          disabled={isAutoColor && variant !== 'main'}
          color={(colors)[variant]}
          setColors={setColors}
          variant={variant}
        />
      ))}
    </Accordion>
  )
}

export default ColorAccordion
