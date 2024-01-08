import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch, useAppSelector } from '../../store/store'
import SlideIn from '../../components/atoms/SlideIn'
import Button from '../../components/atoms/Button'
import { addTheme, removeTheme, selectTheme } from '../../store/features/ThemeSlice'
import ThemePaletteSelection from '../../components/molecule/ThemePaletteSelection'

interface SettingsProps {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const Settings: React.FC<SettingsProps> = ({
  isVisible,
  setIsVisible
}) => {
  // Below themeing stuff is just a POC and will be removed later
  const dispatch = useAppDispatch()

  const { themes, selectedThemeId } = useAppSelector((state) => state.storedThemes)

  const handleAddTheme = (): void => {
    const uuid = uuidv4()
    dispatch(addTheme({
      id: uuid, name: `test-${uuid}`, theme: {
        palette: {
          mode: 'dark',
          colors: {
            grey: {
              white: 'white',
              black: 'black',
              light: 'grey',
              main: 'grey',
              dark: 'grey'
            },
            primary: {
              light: '#ff0000',
              main: '#ff0000',
              dark: '#ff0000'
            },
            secondary: {
              light: '#ff0000',
              main: '#ff0000',
              dark: '#ff0000'
            },
            tertiary: {
              light: '#ff0000',
              main: '#ff0000',
              dark: '#ff0000'
            },
            success: {
              light: '#ff0000',
              main: '#ff0000',
              dark: '#ff0000'
            },
            error: {
              light: '#ff0000',
              main: '#ff0000',
              dark: '#ff0000'
            },
            warning: {
              light: '#ff0000',
              main: '#ff0000',
              dark: '#ff0000'
            },
            red: {
              light: '#ff0000',
              main: '#ff0000',
              dark: '#ff0000'
            },
            green: {
              light: '#ff0000',
              main: '#ff0000',
              dark: '#ff0000'
            },
            blue: {
              light: '#ff0000',
              main: '#ff0000',
              dark: '#ff0000'
            }
          }
        },
        border: {
          width: {
            sm: 22,
            md: 22,
            lg: 22
          },
          radius: {
            sm: 22,
            md: 22,
            lg: 22
          }
        },
        spacing: {
          xxs: 22,
          xs: 22,
          xl: 22,
          xxl: 22,
          sm: 22,
          md: 22,
          lg: 22
        }
      }
    }))
  }

  const handleSelectTheme = (id: string): void => {
    dispatch(selectTheme(id))
  }

  const hadleRemoveTheme = (id: string): void => {
    dispatch(removeTheme(id))
  }

  return (
    <SlideIn isVisible={isVisible} setIsVisible={setIsVisible}>
      <h1>Settings</h1>
      <p>Selected theme: {themes.find((theme) => theme.id === selectedThemeId)?.name}</p>

      <h2>Themes</h2>
      <ul>
        {themes.map((theme) => (
          <li key={theme.id}>
            {theme.name}
            <Button onClick={(): void => { handleSelectTheme(theme.id) }}>Select Theme</Button>
            <Button onClick={(): void => { handleSelectTheme(theme.id) }}>Edit Theme</Button>
            <Button disabled={theme.id === 'default'} onClick={(): void => { hadleRemoveTheme(theme.id) }}>Remove Theme</Button>
          </li>
        ))}
      </ul>
      <Button onClick={handleAddTheme}>Add a theme</Button>
      <p>editing: test-864b5b76-0978-4f12-9589-0cd007561121</p>
      <ThemePaletteSelection themeId='864b5b76-0978-4f12-9589-0cd007561121' />
    </SlideIn>
  )
}

export default Settings
