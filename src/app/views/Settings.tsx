import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch, useAppSelector } from '../../store/store'
import SlideIn from '../../components/atoms/SlideIn'
import Button from '../../components/atoms/Button'
import { addTheme, removeTheme, selectTheme } from '../../store/features/storedThemeSlice'
import ThemePaletteSelection from '../../components/molecule/ThemePaletteSelection'
import { standardTheme } from '../../theme'
import Accordion from '../../components/atoms/Accordion'
import { addWidget } from '../../store/features/storedWidgetsSlice'
import WidgetWrapper from '../../components/molecule/WidgetWrapper'

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

  const handleAddCalendarWidget = (): void => {
    dispatch(addWidget({
      id: uuidv4(),
      name: 'Calendar',
      type: 'GoogleCalendar',
      wh: { w: 700, h: 700 },
      xy: { x: 200, y: 200 },
      minWH: { w: 700, h: 700 },
      zIndex: 0,
      scale: { x: 1, y: 1 },
      widgetValues: {
        src: 'https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23ffffff&ctz=Europe%2FLondon&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=1&showTz=1&src=Njk1M2E3MDkwZTY3NjQ4OWYwYTM0N2YwMWIzMDNjNTkwODc0NTZlY2UyZDcxYzJmNWU4MTAyZWRlYmM2YTEyZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udWsjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23D50000&color=%230B8043',
        calendarWidth: 700,
        calendarHeight: 700
      }
    }))
  }

  const handleAddGoogleSheetsWidget = (): void => {
    dispatch(addWidget({
      id: uuidv4(),
      name: 'Google Sheets',
      type: 'GoogleSheets',
      wh: { w: 700, h: 700 },
      xy: { x: 200, y: 200 },
      minWH: { w: 700, h: 700 },
      zIndex: 0,
      scale: { x: 1, y: 1 },
      widgetValues: {
        src: 'https://docs.google.com/spreadsheets/d/1fn9RXbWujmt4VhIf3mitnTVf73rOwDr09wdG-qOblE8/edit?usp=sharing&amp;widget=true&amp;rm=minimal&amp;headers=false'
      }
    }))
  }

  const handleSimpleNotesWidget = (): void => {
    dispatch(addWidget({
      id: uuidv4(),
      name: 'Simple Notes',
      type: 'SimpleNotepad',
      wh: { w: 700, h: 700 },
      xy: { x: 200, y: 200 },
      minWH: { w: 200, h: 200 },
      zIndex: 0,
      scale: { x: 1, y: 1 },
      widgetValues: {
        notes: 'Hello, world!'
      }
    }))
  }

  const handleMDNotepadWidget = (): void => {
    dispatch(addWidget({
      id: uuidv4(),
      name: 'Markdown Notes',
      type: 'MDNotepad',
      wh: { w: 700, h: 700 },
      xy: { x: 200, y: 200 },
      minWH: { w: 200, h: 200 },
      zIndex: 0,
      scale: { x: 1, y: 1 },
      widgetValues: {
        markdown: '# Hello, world!'
      }
    }))
  }

  const handleTodoList = (): void => {
    dispatch(addWidget({
      id: uuidv4(),
      name: 'Todo List',
      type: 'TodoList',
      wh: { w: 700, h: 700 },
      xy: { x: 200, y: 200 },
      minWH: { w: 200, h: 200 },
      zIndex: 0,
      scale: { x: 1, y: 1 },
      widgetValues: {
        todoList: []
      }
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

      <Accordion label={'Themes'}>
        <p>Selected theme: {themes.find((theme) => theme.id === selectedThemeId)?.name}</p>
        <ul>
          {themes.map((theme) => (
            <li key={theme.id}>
              {/* todo: need a text to input field on click comp for the name of the theme */}
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
      </Accordion>
      <Accordion label='Widgets'>
        <h3>Widgets</h3>
        <Button onClick={(): void => { handleAddCalendarWidget() }}>Add Calendar Widget</Button>
        <br />
        <Button onClick={(): void => { handleAddGoogleSheetsWidget() }}>Add Google Sheets Widget</Button>
        <br />
        <Button onClick={(): void => { handleSimpleNotesWidget() }}>Add Simple Notes Widget</Button>
        <br />
        <Button onClick={(): void => { handleMDNotepadWidget() }}>Add MD Notes Widget</Button>
        <br />
        <Button onClick={(): void => { handleTodoList() }}>Add Todo List Widget</Button>
      </Accordion>
    </SlideIn>
  )
}

export default Settings
