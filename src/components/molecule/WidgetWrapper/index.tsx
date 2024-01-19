import React, { useState } from 'react'
import { useAppSelector } from '../../../store/store'
import GoogleCalendar, { GoogleCalendarProperties } from '../../widgets/GoogleCalendar'
import { StoredWidgetState } from '../../../store/features/storedWidgetsSlice'
import Button from '../../atoms/Button'
import GoogleSheets, { GoogleSheetProperties } from '../../widgets/GoogleSheets'

const WidgetWrapper = (): JSX.Element => {
  const { widgets } = useAppSelector((state) => state.storedWidgets)

  const [isEditMode, setIsEditMode] = useState(true)

  const toRender = widgets.map((widget: StoredWidgetState) => {
    switch (widget.type) {
      case 'GoogleCalendar':
        return (
          <GoogleCalendar
            key={widget.id}
            editMode={isEditMode}
            {...widget}
            {...(widget.widgetValues as GoogleCalendarProperties)}
          />
        )
      case 'GoogleSheets':
        return (
          <GoogleSheets
            key={widget.id}
            editMode={isEditMode}
            {...widget}
            {...(widget.widgetValues as GoogleSheetProperties)}
            // would be nice if there is a better way of doing this
          />
        )
      default:
        return null
    }
  })

  return (
    <div>
      <Button onClick={(): void => setIsEditMode(!isEditMode)}>Toggle edit mode</Button>
      {toRender}
    </div>
  )
}

export default WidgetWrapper
