import React from 'react'
import { useTheme } from '@emotion/react'
import { FontAwesomeIcon, IconProp } from '@fortawesome/react-fontawesome'

import { Color, Colors, ExtraSizing, GreyColor, StandardTheme } from 'src/theme'

interface IconProps {
    icon: IconProp
    color: keyof Colors
    size: keyof ExtraSizing
}

const Icon = ({icon, color, size}: IconProps): JSX.Element => {
  const theme = useTheme() as StandardTheme
  const iconColor = theme.palette.colors[color].main
  return (
    <FontAwesomeIcon icon={icon} color={iconColor}/>
  )
}
export default Icon
