import styled from '@emotion/styled'
import React, { useState } from 'react'

import { HexColorPicker, HexColorInput } from 'react-colorful'
import Icon from '../Icon'
import OutsideClickHandler from '../OutsideClickHandler'

interface ColorPickerProps {
  color: string
  setColor: (color: string) => void
  id?: string
  disabled?: boolean
}

const Container = styled.div(
  ({ theme }): string => {
    return `
      position: relative;
      
      .react-colorful {
        width: 200px;
        height: 200px;
        position: absolute;
        &__last-control {
          border-radius: 0;
        }
      }

      .react-colorful-input {
        position: absolute;
        padding: 4px;
        bottom: -224px;
        width: 192px;
        left: 0px;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        outline: 1px solid ${theme.palette.colors.grey.black};
        background-color: ${theme.palette.colors.grey.white};
        border: none;
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
      outline: ${theme.border.width.sm}px solid ${isClickable ? 'none' : theme.palette.colors.grey.light};
      cursor: ${isClickable ? 'pointer' : 'not-allowed'};
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
    if (disabled) {
      return
    }
    setIsVisible(!isVisible)
  }

  const handleOutsideClick = (): void => {
    setIsVisible(false)
  }

  return (
    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
      <Container>
        <ColorPreview color={color} onClick={handleIsVisible} isClickable={!disabled} />
        <ColorPickerContainer isVisible={isVisible}>
          <IconContainer>
            <Icon icon='circle-xmark' color='red' prefix='fas' size='lg' onClick={handleIsVisible} />
          </IconContainer>
          <HexColorPicker id={id} color={color} onChange={setColor} />
          <HexColorInput className='react-colorful-input' color={color} onChange={setColor} prefixed />
        </ColorPickerContainer>
      </Container>
    </OutsideClickHandler>
  )
}

export default ColorPicker
