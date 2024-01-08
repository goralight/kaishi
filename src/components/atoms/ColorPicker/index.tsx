import styled from '@emotion/styled'
import React, { useState } from 'react'

import { HexColorPicker } from 'react-colorful'
import Icon from '../Icon'

interface ColorPickerProps {
  color: string
  setColor: (color: string) => void
  id?: string
  disabled?: boolean
}

const Container = styled.div(
  (): string => {
    return `
      position: relative;
      
      .react-colorful {
        width: 200px;
        height: 200px;
        position: absolute;
      }
    `
  }
)

const ColorPreview = styled.div<{ color: string, isClickable: boolean }>(
  ({ theme, color, isClickable }): string => {
    return `
      width: ${theme.spacing.xxl}px;
      height: ${theme.spacing.xxl}px;
      background-color: ${color};
      border-radius: ${theme.border.radius.sm}px;
      border: ${theme.border.width.sm}px solid ${theme.palette.colors.grey.white};
      cursor: ${isClickable ? 'pointer' : 'default'};
    `
  }
)

const ColorPickerContainer = styled.div<{ isVisible: boolean }>(
  ({ theme, isVisible }): string => {
    const offset = (200 - theme.spacing.xxl) / 2
    return `
      position: absolute;
      transition: opacity .3s ease;
      top: -${offset}px;
      left: -${offset}px;
      opacity: ${isVisible ? '1' : '0'};
      pointer-events: ${isVisible ? 'all' : 'none'};
      z-index: 1;
    `
  }
)

const IconContainer = styled.div(
  (): string => {
    return `
      position: relative;
      width: 200px;

      & > svg {
        position: absolute;
        top: -24px;
        right: -24px;
      }
    `
  }
)

const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  setColor,
  id,
  disabled = false
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleIsVisible = (): void => {
    setIsVisible(!isVisible)
  }

  return (
    <Container>
      <ColorPreview color={color} onClick={handleIsVisible} isClickable={!disabled} />
      <ColorPickerContainer isVisible={isVisible}>
        <IconContainer>
          <Icon icon='circle-xmark' color='red' prefix='fas' size='lg' onClick={handleIsVisible} />
        </IconContainer>
        <HexColorPicker id={id} color={color} onChange={setColor} />
      </ColorPickerContainer>
    </Container>
  )
}

export default ColorPicker
