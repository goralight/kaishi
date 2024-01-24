import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { Colors, standardTheme } from '../../../theme'
import styled from '@emotion/styled'
import ColorAccordion from '../ColorAccordion'
import Button from '../../atoms/Button'
import { updateTheme } from '../../../store/features/storedThemeSlice'

interface ThemePaletteSelectionProps {
  themeId: string,
}

const Container = styled.div(
  (): string => {
    return `
      display: flex;
      gap: 8px;
    `
  }
)

const AccordionContainer = styled.div(
  (): string => {
    return `
      display: flex;
      flex-direction: column;
      gap: 8px;
    `
  }
)

const ThemePaletteSelection: React.FC<ThemePaletteSelectionProps> = ({
  themeId
}) => {
  const dispatch = useAppDispatch()
  const { themes } = useAppSelector((state) => state.storedThemes)

  const selectedTheme = themes.find((theme) => theme.id === themeId)

  if (!selectedTheme) {
    return null
  }

  const [themeColors, setThemeColors] = useState<Colors>(selectedTheme.theme.palette.colors)

  const colorsNames = Object.keys(standardTheme.palette.colors) as (keyof Colors)[]

  const handleThemeSave = (): void => {
    dispatch(updateTheme({
      ...selectedTheme,
      theme: {
        ...selectedTheme.theme,
        palette: {
          ...selectedTheme.theme.palette,
          colors: themeColors
        }
      }
    }))
  }

  return (
    <Container>
      <AccordionContainer>
        {colorsNames.map((colorName) => (
          <ColorAccordion key={colorName} colorName={colorName} originalTheme={selectedTheme} themeColors={themeColors} setThemeColors={setThemeColors} />
        ))}
      </AccordionContainer>
      <Button color='primary' size='xxs' onClick={handleThemeSave}>Save</Button>
    </Container>
  )
}

export default ThemePaletteSelection
