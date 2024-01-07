import styled from '@emotion/styled'
import React, { useState } from 'react'

import { HexColorPicker } from 'react-colorful'
import Icon from '../Icon'

interface ColorPickerProps {
  color: string
}

const Container = styled.div(
  ({ theme }): string => {
    return `
      .react-colorful {
        width: 200px;
        height: 200px;
        top: -90px;
        left: -90px;
        position: absolute;
      }
    `
  }
)

const ColorPreview = styled.div(
  ({ theme, color }): string => {
    return `
      width: 20px;
      height: 20px;
      background-color: ${color};
      border-radius: ${theme.border.radius.sm}px;
      border: ${theme.border.width.sm}px solid ${theme.palette.colors.grey.white}; 
    `
  }
)

const ColorPickerContainer = styled.div(
  ({ theme }): string => {
    return `
      position: relative;
    `
  }
)

const ColorPicker = ({
  color
}: ColorPickerProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false)
  const handleIsVisible = () => {
    setIsVisible(!isVisible)
  }
  return (
    <Container>
      <ColorPreview color={color} onClick={handleIsVisible} />
      {isVisible ? (
        <ColorPickerContainer>
          <Icon icon='circle-xmark' color='red' onClick={handleIsVisible}/>
          <HexColorPicker/>
        </ColorPickerContainer>
      ) : null}
    </Container>
  )
}

export default ColorPicker
