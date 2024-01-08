import React, { useEffect, useImperativeHandle, useState } from 'react'
import ColorPicker from '../ColorPicker'
import styled from '@emotion/styled'
import { Color, Colors, GreyColor } from '../../../theme'

export interface ColorSelectorRef {
  setColor: (color: string) => void
}

interface ColorSelectorProps {
  variantColors: GreyColor
  setThemeColors: (themeColors: Colors) => void
  color: string
  setColors: React.Dispatch<React.SetStateAction<GreyColor | Color>>
  colorName: string
  themeColors: Colors
  variant: string
  disabled?: boolean
}

const Container = styled.div(
  (): string => {
    return `
      display: flex;
      justify-content: space-between;
      align-items: center;
    `
  }
)

const StyledLabel = styled.label(
  ({ theme }): string => {
    return `
      display: block;
      margin-right: ${theme.spacing.sm}px;
    `
  }
)

const ColorSelector: React.FC<ColorSelectorProps> = ({
  variantColors,
  setThemeColors,
  themeColors,
  colorName,
  variant,
  color,
  setColors,
  disabled = false
}) => {
  // const [color, setColor] = useState(variantColors[variant as keyof GreyColor])

  // useImperativeHandle(ref, () => ({
  //   setColor(color: string): void {
  //     setColor(color)
  //   }
  // }), [setColor])

  // useEffect(() => {
  //   const toChange = {
  //     ...themeColors,
  //     [colorName]: {
  //       ...(themeColors[colorName as keyof Colors]),
  //       [variant]: color
  //     }
  //   }

  //   console.log('toChange!', toChange)
  //   setThemeColors(toChange)
  // }, [color])

  const handleSetColor = (color: string): void => {
    setColors((prev) => {
      return {
        ...prev,
        [variant]: color
      }
    })
  }

  return (
    <Container>
      <StyledLabel htmlFor={variant}>{variant}</StyledLabel>
      <ColorPicker id={variant} color={color} setColor={handleSetColor} disabled={disabled} />
    </Container>
  )
}

// const ColorSelector = React.forwardRef<ColorSelectorRef, ColorSelectorProps>(({
//   variantColors,
//   setThemeColors,
//   themeColors,
//   colorName,
//   variant,
//   color,
//   setColors,
//   disabled = false
// }, ref): JSX.Element => {
//   // const [color, setColor] = useState(variantColors[variant as keyof GreyColor])

//   // useImperativeHandle(ref, () => ({
//   //   setColor(color: string): void {
//   //     setColor(color)
//   //   }
//   // }), [setColor])

//   // useEffect(() => {
//   //   const toChange = {
//   //     ...themeColors,
//   //     [colorName]: {
//   //       ...(themeColors[colorName as keyof Colors]),
//   //       [variant]: color
//   //     }
//   //   }

//   //   console.log('toChange!', toChange)
//   //   setThemeColors(toChange)
//   // }, [color])

//   const handleSetColor = (color: string): void => {
//     setColors()
//   }

//   return (
//     <Container>
//       <StyledLabel htmlFor={variant}>{variant}</StyledLabel>
//       <ColorPicker id={variant} color={color} setColor={handleSetColor} disabled={disabled} />
//     </Container>
//   )
// })

// ColorSelector.displayName = 'ColorSelector'

export default ColorSelector
