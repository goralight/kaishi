import React from 'react'
import Styled from '@emotion/styled'
import { Colors, Color, ExtraSizing } from '../../../theme'

import { getColor } from '../utils'

interface ButtonProps {
  color?: keyof Colors
  colorVariant?: keyof Color
  size?: keyof ExtraSizing
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}

interface StyledButtonProps {
  color: keyof Colors
  colorVariant: keyof Color
  size: keyof ExtraSizing
}

const StyledButton = Styled.button<StyledButtonProps>(
  ({ theme, color, colorVariant, size }): string => {
    const { backgroundColor, fontColor, hoverColor } = getColor(theme, color, colorVariant)

    return `
      background-color: ${backgroundColor};
      transition: background-color 0.2s ease;
      padding: ${theme.spacing[size]}px;
      height: fit-content;
      border-radius: ${theme.border.radius.sm}px;
      border: none;
      cursor: pointer;
      color: ${fontColor};

      &:disabled {
        cursor: not-allowed;
        background-color: ${theme.palette.colors.disabled.main};
        color: ${theme.palette.colors.disabled.light};

        &:hover {
          background-color: ${theme.palette.colors.disabled.dark};
        }
      }

      &:hover {
        background-color: ${hoverColor}
      }
    `
  }
)

const Button = ({
  color = 'primary',
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
