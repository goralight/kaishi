import styled from '@emotion/styled'
import React from 'react'
import { Colors, ExtraSizing, GreyColor } from '../../../theme'
import { getColor } from '../utils'

interface PillProps {
  color?: keyof Colors | 'white' | 'black'
  colorVariant?: keyof GreyColor
  size?: keyof ExtraSizing
  children: React.ReactNode
}

const StyledSpan = styled.span<{ color: keyof Colors | 'white' | 'black', colorVariant: keyof GreyColor, size: keyof ExtraSizing }>(
  ({ theme, color, colorVariant }): string => {
    let backgroundColor, fontColor
    if (color === 'white' || color === 'black') {
      ({ backgroundColor, fontColor } = getColor(theme, 'grey', color))
    } else {
      ({ backgroundColor, fontColor } = getColor(theme, color, colorVariant))
    }
    return `
      display: inline-block;
      padding: ${theme.spacing.xxs}px;
      border-radius: ${theme.border.radius.sm}px;
      background-color: ${backgroundColor};
      color: ${fontColor};
      font-size: ${theme.spacing.xs}px;
    `
  }
)

const index = ({
  color = 'primary',
  colorVariant = 'main',
  size = 'xs',
  children
}: PillProps): JSX.Element => {
  return (
    <StyledSpan color={color} colorVariant={colorVariant} size={size}>{children}</StyledSpan>
  )
}

export default index
