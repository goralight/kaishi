import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName } from '@fortawesome/fontawesome-svg-core'

import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { Colors, ExtraSizing } from '../../../theme'

interface IconProps {
  icon: IconName
  prefix?: 'fas' | 'far' | 'fab'
  color?: keyof Colors
  size?: keyof ExtraSizing,
  title?: string
  onClick?: () => void
  id?: string
  disabled?: boolean
}

interface StyledFontAwesomeIconProps {
  color: keyof Colors
  isClickable: boolean
  disabled: boolean
}

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)<StyledFontAwesomeIconProps>(
  ({ theme, color, isClickable, disabled }): string => {
    const iconColor: string = theme.palette.colors[color].main
    const hoverColor: string = theme.palette.colors[color].dark

    return `
      color: ${iconColor};
      cursor: ${(disabled || !isClickable) ? 'default' : 'pointer'};

      ${isClickable ? `
        transition: color 0.2s ease;

        &:hover {
          ${!disabled ? `color: ${hoverColor};` : ''}; 
        }
      ` : null}
    `
  }
)

const Icon = ({
  icon,
  prefix = 'far',
  color = 'primary',
  size = 'md',
  title,
  id,
  disabled = false,
  onClick
}: IconProps): JSX.Element => {
  const theme = useTheme()

  return (
    <StyledFontAwesomeIcon icon={[prefix, icon]} color={color} disabled={disabled} id={id} fontSize={theme.spacing[size]} isClickable={!!onClick} title={title} onClick={onClick} />
  )
}
export default Icon
