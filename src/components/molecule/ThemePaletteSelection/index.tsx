import React from 'react'
import { useAppSelector } from '../../../store/store'
import { standardTheme } from '../../../theme'
import ColorSelector from '../../atoms/ColorSelector'
import styled from '@emotion/styled'

interface ThemePaletteSelectionProps {
  id: string,
}

const Container = styled.div(
  ({ theme }): string => {
    return `
      display: flex;
      flex-direction: column;
      gap: 8px;
    `
  }
)

const ThemePaletteSelection: React.FC<ThemePaletteSelectionProps> = (
  id,
) => {

  const colors = Object.keys(standardTheme.palette.colors)

  const { themes } = useAppSelector((state) => state.storedThemes)

  return (
    <Container>
      {colors.map((colorName) => (
        // switch to a ColorAccordion, which will contain the color selectors for each subcolor type
        // The name will be the key so you know if you should show just the primary colors or all of the grey ones.
        <ColorSelector key={colorName} color={'#000000'} setColor={() => { console.log('Logged!') }} name={colorName.toLocaleUpperCase()} />
      ))}
    </Container>
  )
}

export default ThemePaletteSelection
