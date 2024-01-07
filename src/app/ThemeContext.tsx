import { ThemeProvider } from '@emotion/react'
import React from 'react'
import { useAppSelector } from '../store/store'

interface ThemeContextProps {
  children: React.ReactNode
}

const ThemeContext: React.FC<ThemeContextProps> = ({
  children
}) => {
  const { themes, selectedThemeId } = useAppSelector((state) => state.storedThemes)

  const selectedTheme = themes.find((theme) => theme.id === selectedThemeId)

  if (!selectedTheme) {
    return null
  }

  return (
    <ThemeProvider theme={selectedTheme.theme}>
      {children}
    </ThemeProvider>
  )
}

export default ThemeContext
