import React from 'react'
import ColorPicker from '../ColorPicker'
import styled from '@emotion/styled'

interface ColorSelectorProps {
  color: string
  setColor: (color: string) => void
  name: string
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
  color,
  setColor,
  name
}) => {
  return (
    <Container>
      <StyledLabel htmlFor={name}>{name}</StyledLabel>
      <ColorPicker id={name} color={color} setColor={setColor} />
    </Container>
  )
}

export default ColorSelector
