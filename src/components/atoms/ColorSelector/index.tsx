import React from 'react'
import ColorPicker from '../ColorPicker'
import styled from '@emotion/styled'
import { Color, GreyColor } from '../../../theme'

export interface ColorSelectorRef {
  setColor: (color: string) => void
}

interface ColorSelectorProps {
  color: string
  setColors: React.Dispatch<React.SetStateAction<GreyColor | Color>>
  variant: string
  disabled?: boolean
}

const Container = styled.div(
  (): string => {
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
  variant,
  color,
  setColors,
  disabled = false
}) => {

  const handleSetColor = (color: string): void => {
    setColors((prev) => {
      return {
        ...prev,
        [variant]: color
      }
    })
  }

  return (
    <Container>
      <StyledLabel htmlFor={variant}>{variant}</StyledLabel>
      <ColorPicker id={variant} color={color} setColor={handleSetColor} disabled={disabled} />
    </Container>
  )
}

export default ColorSelector
