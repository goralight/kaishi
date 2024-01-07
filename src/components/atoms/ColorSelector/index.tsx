import React, { useEffect, useState } from 'react'
import ColorPicker from '../ColorPicker'
import styled from '@emotion/styled'
import { Colors, GreyColor } from '../../../theme'

interface ColorSelectorProps {
  variantColors: GreyColor
  setThemeColors: (themeColors: Colors) => void
  colorName: string
  themeColors: Colors
  variant: string
}

const Container = styled.div(
  ({ theme }): string => {
    return `
      display: flex;
      justify-content: space-between;
      align-items: center;
    `
  }
)

const StyledLabel = styled.label(
  ({ theme }): string => {
    return `
      display: block;
      margin-right: ${theme.spacing.sm}px;
    `
  }
)

const ColorSelector: React.FC<ColorSelectorProps> = ({
  variantColors,
  setThemeColors,
  themeColors,
  colorName,
  variant
}) => {

  const [color, setColor] = useState(variantColors[variant as keyof GreyColor])

  useEffect(() => {
    setThemeColors({
      ...themeColors,
      [colorName]: {
        ...(themeColors[colorName as keyof Colors] || {}),
        [variant]: color
      }
    })
  }, [color])

  return (
    <Container>
      <StyledLabel htmlFor={variant}>{variant}</StyledLabel>
      <ColorPicker id={variant} color={color} setColor={setColor} />
    </Container>
  )
}

export default ColorSelector
