import React from 'react'
import Styled from '@emotion/styled'

import { Colors, GreyColor, ExtraSizing } from 'src/theme'

interface ButtonProps {
  color: keyof Colors
  colorVariant: keyof GreyColor
  size: keyof ExtraSizing
  onClick: () => void
  children: React.ReactNode
}

const StyledButton = Styled.button<{ color: ButtonProps['color'], colorVariant: ButtonProps['colorVariant'], size: ButtonProps['size'] }>(
  ({ theme, color, colorVariant, size }): string => {
    const backgroundColor = (theme.palette.colors[color] as GreyColor)[colorVariant]

    if (!backgroundColor) {
      throw new Error(
        `Color: ${color} with colorVariant: ${colorVariant} does not exist. Check the theme.`
      )
    }

    return `
      background-color: ${backgroundColor};
      padding: ${theme.spacing[size]}px;
    `
  }
)

const Button = ({
  color,
  size,
  colorVariant = 'main',
  onClick,
  children
}: ButtonProps): JSX.Element => {
  return (
    <StyledButton
      color={color}
      colorVariant={colorVariant}
      size={size}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  )
}

export default Button
