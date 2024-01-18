import React, { useState } from 'react'
import { useAppSelector } from '../../../store/store'
import GoogleCalendar from '../../widgets/GoogleCalendar'
import { StoredWidgetState } from '../../../store/features/storedWidgetsSlice'
import Button from '../../atoms/Button'

const WidgetWrapper = (): JSX.Element => {
  const { widgets } = useAppSelector((state) => state.storedWidgets)

  const [isEditMode, setIsEditMode] = useState(true)

  const toRender = widgets.map((widget: StoredWidgetState) => {
    switch (widget.type) {
      case 'GoogleCalendar':
        return (
          <GoogleCalendar
            key={widget.id}
            id={widget.id}
            name={widget.name}
            type={widget.type}
            editMode={isEditMode}
            xy={widget.xy}
            wh={widget.wh}
            originalWh={widget.originalWh}
            zIndex={widget.zIndex}
            scale={widget.scale}
            src={widget.widgetValues.src}
            calendarWidth={widget.widgetValues.calendarWidth}
            calendarHeight={widget.widgetValues.calendarHeight}
          />
        )
      default:
        return null
    }
  })

  return (
    <div>
      <p>awd</p>
      <Button onClick={(): void => setIsEditMode(!isEditMode)}>Toggle edit mode</Button>
      {toRender}
    </div>
  )
}

export default WidgetWrapper
