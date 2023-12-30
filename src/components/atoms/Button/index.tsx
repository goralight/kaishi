import React from 'react'
import Styled from '@emotion/styled'
import { Colors, GreyColor, ExtraSizing } from '../../../theme'

import { getColor } from '../utils'

interface ButtonProps {
  color?: keyof Colors
  colorVariant?: keyof GreyColor
  size?: keyof ExtraSizing
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}

interface StyledButtonProps {
  color: keyof Colors
  colorVariant: keyof GreyColor
  size: keyof ExtraSizing
}

const StyledButton = Styled.button<StyledButtonProps>(
  ({ theme, color, colorVariant, size, disabled }): string => {
    const { backgroundColor, fontColor, hoverColor } = getColor(theme, color, colorVariant)

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
