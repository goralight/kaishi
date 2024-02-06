import React, { useEffect, useState } from 'react'
import Widget from '../../molecule/Widget'
import { CommonWidgetProperties, updateWidget } from '../../../store/features/storedWidgetsSlice'
import { useAppDispatch } from '../../../store/store'
import styled from '@emotion/styled'

export interface SimpleNotepadProperties {
  notes: string
}

const StyledTextarea = styled.textarea(
  ({ theme }): string => {
    return `
      background-color: ${theme.palette.colors.background.dark};
      color: ${theme.palette.colors.foreground.main};
      border-radius: ${theme.border.radius}px;
      border: none;
      resize: none;
      width: 100%;
      height: 100%;
      padding: 8px;
      font-size: 16px;
      font-family: 'Roboto', sans-serif;

      &:focus {
        outline: none;
      }
    `
  }
)

interface SimpleNotepadProps extends CommonWidgetProperties, SimpleNotepadProperties { }

const SimpleNotepad = ({
  id,
  name,
  type = 'GoogleSheets',
  editMode,
  zIndex,
  xy,
  wh,
  minWH,
  scale,
  notes
}: SimpleNotepadProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const [value, setValue] = useState(notes)

  useEffect(() => {
    dispatch(updateWidget({
      id,
      widgetValues: {
        notes: value
      }
    }))

  }, [value])

  return (
    <Widget
      id={id}
      name={name}
      type={type}
      editMode={editMode}
      wh={wh}
      xy={xy}
      minWH={minWH}
      zIndex={zIndex}
      scale={scale}
    >
      <StyledTextarea style={{ height: wh.h, width: wh.w }} value={value} onChange={(e): void => { setValue(e.target.value) }} />
    </Widget>
  )
}

export default SimpleNotepad
