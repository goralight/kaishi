import React from 'react'
import Styled from '@emotion/styled'

import { Colors, GreyColor, ExtraSizing } from 'src/theme'

interface ButtonProps {
  color: keyof Colors
  colorVariant?: keyof GreyColor
  size?: keyof ExtraSizing
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}

const StyledButton = Styled.button<{ color: keyof Colors, colorVariant: keyof GreyColor, size: keyof ExtraSizing }>(
  ({ theme, color, colorVariant, size, disabled }): string => {
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
      background-color: ${disabled ? theme.palette.colors.grey.dark : backgroundColor};
      transition: background-color 0.2s ease;
      padding: ${theme.spacing[size]}px;
      height: fit-content;
      border-radius: ${theme.border.radius.sm}px;
      border: none;
      cursor: pointer;
      color: ${fontColor};

      &:disabled {
        cursor: not-allowed;
        color: ${theme.palette.colors.grey.light};

        &:hover {
          background-color: ${theme.palette.colors.grey.dark};
        }
      }

      &:hover {
        background-color: ${hoverColor}
      }
    `
  }
)

const Button = ({
  color,
  size = 'md',
  colorVariant = 'main',
  disabled = false,
  onClick,
  children
}: ButtonProps): JSX.Element => {
  return (
    <StyledButton
      color={color}
      colorVariant={colorVariant}
      size={size}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  )
}

export default Button
