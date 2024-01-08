import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch, useAppSelector } from '../../store/store'
import SlideIn from '../../components/atoms/SlideIn'
import Button from '../../components/atoms/Button'
import { addTheme, removeTheme, selectTheme } from '../../store/features/ThemeSlice'
import ThemePaletteSelection from '../../components/molecule/ThemePaletteSelection'
import { standardTheme } from '../../theme'

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

  const [currentEditingTheme, setCurrentEditingTheme] = useState('')

  const handleAddTheme = (): void => {
    const uuid = uuidv4()
    dispatch(addTheme({
      id: uuid, name: `test-${uuid}`, theme: standardTheme
    }))
  }

  const handleSelectTheme = (id: string): void => {
    dispatch(selectTheme(id))
  }

  const handleRemoveTheme = (id: string): void => {
    if (id === currentEditingTheme) {
      setCurrentEditingTheme('')
    }
    dispatch(removeTheme(id))
  }

  const handleEditTheme = (id: string): void => {
    setCurrentEditingTheme(id)
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
            <Button disabled={theme.id === 'default'} onClick={(): void => { handleEditTheme(theme.id) }}>Edit Theme</Button>
            <Button disabled={theme.id === 'default'} onClick={(): void => { handleRemoveTheme(theme.id) }}>Remove Theme</Button>
          </li>
        ))}
      </ul>
      <Button onClick={handleAddTheme}>Add a theme</Button>
      {currentEditingTheme && (
        <>
          <p>editing: test-{currentEditingTheme}</p>
          <ThemePaletteSelection themeId={currentEditingTheme} />
          <Button onClick={(): void => { setCurrentEditingTheme('') }}>Close</Button>
        </>
      )}
    </SlideIn>
  )
}

export default Settings
