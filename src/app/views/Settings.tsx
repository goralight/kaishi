import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch, useAppSelector } from '../../store/store'
import SlideIn from '../../components/atoms/SlideIn'
import Button from '../../components/atoms/Button'
import { addTheme, removeTheme, selectTheme } from '../../store/features/ThemeSlice'
import ThemePaletteSelection from '../../components/molecule/ThemePaletteSelection'
import { standardTheme } from '../../theme'
import Accordion from '../../components/atoms/Accordion'
import AddImage from '../../components/molecule/AddImage'
import { Rnd } from 'react-rnd'

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

  // RND testing
  const [inUseElements, setInUseElements] = useState([])
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [initWidth, setInitWidth] = useState(0)
  const [initHeight, setInitHeight] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState({ x: 1, y: 1 })

  const { images } = useAppSelector((state) => state.storedImages)

  useEffect(() => {
    if (buttonRef.current) {
      setWidth(buttonRef.current.offsetWidth)
      setHeight(buttonRef.current.offsetHeight)
      setInitWidth(buttonRef.current.offsetWidth)
      setInitHeight(buttonRef.current.offsetHeight)
    }
  }, [])



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
      <Accordion label='images'>
        <AddImage />
      </Accordion>

      {/* RND testing */}
      {images.length > 0 && (
        <Rnd
          size={{ width: initWidth * scale.x, height: initHeight * scale.y }}
          position={{ x: position.x, y: position.y }}
          onDragStop={(e, d): void => {
            setPosition({ x: d.x, y: d.y })
          }}
          onResize={(e, direction, ref, delta, position): void => {
            setWidth(parseInt(ref.style.width))
            setHeight(parseInt(ref.style.height))
            setPosition({ x: position.x, y: position.y })
            setScale({ x: ref.offsetWidth / initWidth, y: ref.offsetHeight / initHeight })
          }}
          lockAspectRatio={false}
          style={{
            border: 'dashed 1px red',
            transform: `scale(${scale.x}, ${scale.y})`
          }}
        >
          <div style={{
            // width: width,
            // height: height
            transform: `scale(${scale.x}, ${scale.y})`
          }}>
            <button
              // style={{ transform: `scale(${scale.x}, ${scale.y})` }}
              ref={buttonRef} onClick={() => { console.log('Logged!') }}>awd</button>
          </div>
          {/* <div style={{ backgroundImage: `url("${images[0].data}")`, transform: `scale(${width / 300}, ${height / 300})`, backgroundRepeat: 'no-repeat', height: height, width: width }} /> */}
          {/* <div style={{ backgroundImage: `url("${images[0].data}")`, backgroundSize: `${width}px ${height}px`, backgroundRepeat: 'no-repeat', height: height, width: width }} /> */}
        </Rnd>
      )}

    </SlideIn>
  )
}

export default Settings
