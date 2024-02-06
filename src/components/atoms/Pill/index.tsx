import styled from '@emotion/styled'
import React from 'react'
import { Color, Colors, ExtraSizing } from '../../../theme'
import { getColor } from '../utils'

interface PillProps {
  text: string
  color?: keyof Colors
  colorVariant?: keyof Color
  size?: keyof ExtraSizing
}

interface StyledSpanProps {
  color: keyof Colors
  colorVariant: keyof Color
  size: keyof ExtraSizing
}

const StyledSpan = styled.span<StyledSpanProps>(
  ({ theme, color, colorVariant }): string => {
    const { backgroundColor, fontColor } = getColor(theme, color, colorVariant)

    return `
      display: inline-block;
      padding: ${theme.spacing.xxs}px;
      border-radius: ${theme.border.radius}px;
      background-color: ${backgroundColor};
      color: ${fontColor};
      font-size: ${theme.spacing.xs}px;
    `
  }
)

const Pill = ({
  color = 'primary',
  colorVariant = 'main',
  size = 'xs',
  text
}: PillProps): JSX.Element => {
  return (
    <StyledSpan color={color} colorVariant={colorVariant} size={size}>{text}</StyledSpan>
  )
}

export default Pill
