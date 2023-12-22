import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import { Colors, ExtraSizing } from 'src/theme'
import styled from '@emotion/styled'

interface IconProps {
  icon: IconProp
  color?: keyof Colors | 'white' | 'black'
  size?: keyof ExtraSizing,
  onClick?: () => void
}
interface StyledFontAwesomeIconProps {
  color: keyof Colors | 'white' | 'black'
  width: keyof ExtraSizing
  height: keyof ExtraSizing
  isClickable: boolean
}

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)<StyledFontAwesomeIconProps>(
  ({ theme, color, width, height, isClickable }): string => {
    let iconColor: string
    if (color === 'white' || color === 'black') {
      iconColor = theme.palette.colors.grey[color]
    } else {
      iconColor = theme.palette.colors[color].main
    }

    let hoverColor: string
    if (color === 'white') {
      hoverColor = theme.palette.colors.grey.light
    } else if (color === 'black') {
      hoverColor = theme.palette.colors.grey.dark
    } else {
      hoverColor = theme.palette.colors[color].dark
    }

    return `
      color: ${iconColor};
      width: ${theme.spacing[width]}px;
      height: ${theme.spacing[height]}px;
      cursor: ${isClickable ? 'pointer' : 'default'};

      ${isClickable ? `
        transition: color 0.2s ease;

        &:hover {
          color: ${hoverColor};
        }
      ` : null}
    `
  }
)

const Icon = ({
  icon,
  color = 'primary',
  size = 'md',
  onClick
}: IconProps): JSX.Element => {
  return (
    <StyledFontAwesomeIcon icon={icon} color={color} height={size} width={size} isClickable={!!onClick} onClick={onClick} />
  )
}
export default Icon
