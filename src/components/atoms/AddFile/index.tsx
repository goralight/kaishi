import React from 'react'
import { Colors, ExtraSizing, GreyColor } from '../../../theme'
import styled from '@emotion/styled'

interface AddFileProps {
  id: string
  text: string
  onFileUpload: (file: FileList | null) => void
  accept?: string
  size?: keyof ExtraSizing
  color?: keyof Colors
  colorVariant?: keyof GreyColor
  disabled?: boolean
}

interface StyledInputProps {
  color: keyof Colors
  colorVariant: keyof GreyColor
  scale: keyof ExtraSizing
  disabled: boolean
}

const StyledLabel = styled.label<StyledInputProps>(
  ({ theme, color, colorVariant, scale, disabled }): string => {
    const themeColor = (theme.palette.colors[color] as GreyColor)
    const backgroundColor = themeColor[colorVariant]

    if (!backgroundColor) {
      throw new Error(
        `Color: ${color} with colorVariant: ${colorVariant} does not exist. Check the theme.`
      )
    }

    let hoverColor
    switch (colorVariant) {
      case 'main':
        hoverColor = themeColor.dark
        break
      case 'light':
        hoverColor = themeColor.main
        break
      case 'dark':
        hoverColor = themeColor.main
        break
      case 'white':
        hoverColor = themeColor.light
        break
      case 'black':
        hoverColor = themeColor.dark
        break
      default:
        hoverColor = backgroundColor
        break
    }

    let fontColor: string
    if (color === 'grey' && colorVariant === 'white') {
      fontColor = 'black'
    } else if (color === 'grey' && colorVariant === 'black') {
      fontColor = 'white'
    } else if (theme.palette.mode === 'dark') {
      fontColor = 'white'
    } else {
      fontColor = 'black'
    }

    return `
      display: block;
      background-color: ${backgroundColor};
      color: ${fontColor};
      cursor: ${disabled ? 'default' : 'pointer'};
      border: none;
      border-radius: ${theme.border.radius.sm}px;
      padding: ${theme.spacing[scale]}px;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: ${hoverColor};
      }
    `
  }
)

const StyledInput = styled.input(
  (): string => {
    return `
      display: none;
    `
  }
)

const AddFile = ({
  id,
  text,
  accept = '*',
  size = 'md',
  color = 'primary',
  colorVariant = 'main',
  disabled = false,
  onFileUpload
}: AddFileProps): JSX.Element => {
  return (
    <>
      <StyledLabel
        htmlFor={id}
        color={color}
        colorVariant={colorVariant}
        scale={size}
        disabled={disabled}
      >
        {text}
      </StyledLabel>
      <StyledInput id={id} type='file' onChange={(e): void => onFileUpload(e.currentTarget.files)} accept={accept} />
    </>
  )
}

export default AddFile
