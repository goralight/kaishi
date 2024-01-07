import React from 'react'
import Accordion from '../../atoms/Accordion'
import ColorSelector from '../../atoms/ColorSelector'
import { Colors, GreyColor } from '../../../theme'
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

  const variants = ['light', 'main', 'dark']

  if (colorName === 'grey') {
    variants.push('black')
    variants.unshift('white')
  }

  const variantColors: GreyColor = originalTheme.theme.palette.colors[colorName as keyof Colors] as GreyColor

  return (
    <Accordion label={colorName} color={variantColors.main}>
      {variants.map((variant) => (
        <ColorSelector
          key={variant}
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
