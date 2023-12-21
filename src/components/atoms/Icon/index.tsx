import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import { Colors, ExtraSizing } from 'src/theme'
import styled from '@emotion/styled'

interface IconProps {
  icon: IconProp
  color: keyof Colors
  size: keyof ExtraSizing
}

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)<{ color: keyof Colors, width: keyof ExtraSizing, height: keyof ExtraSizing }>(
  ({ theme, color, width, height }): string => {
    const iconColor = theme.palette.colors[color].main // todo: fix that we cant black / white

    return `
      color: ${iconColor};
      width: ${theme.spacing[width]}px;
      height: ${theme.spacing[height]}px;
    `
  }
)

const Icon = ({ icon, color, size }: IconProps): JSX.Element => {
  return (
    <StyledFontAwesomeIcon icon={icon} color={color} height={size} width={size} />
  )
}
export default Icon
