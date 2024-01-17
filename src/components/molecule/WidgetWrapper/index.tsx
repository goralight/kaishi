import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import GoogleCalendar from '../../widgets/GoogleCalendar'
import Button from '../../atoms/Button'
import { addWidget, updateAllWidgets } from '../../../store/features/storedWidgetsSlice'

const WidgetWrapper = () => {
  const dispatch = useAppDispatch()
  const { widgets } = useAppSelector((state) => state.storedWidgets)

  const [isEditMode, setIsEditMode] = useState(true)
  const [allWidgetValues, setAllWidgetValues] = useState<any>(widgets)

  // useEffect(() => {
  //   console.log('widgets', widgets)
  //   setAllWidgetValues(widgets.map((widget) => widget.widgetValues))
  // }, [widgets])

  useEffect(() => {
    dispatch(updateAllWidgets(allWidgetValues))
  }, [allWidgetValues])


  const toRender = allWidgetValues.map((widget: any) => {
    console.log('Logged!', widget)
    switch (widget.type) {
      case 'GoogleCalendar':
        return (
          <GoogleCalendar
            key={widget.id}
            id={widget.id}
            name={widget.name}
            type={widget.type}
            editMode={isEditMode}
            setAllWidgetValues={setAllWidgetValues}
            xy={widget.xy}
            // setXy={widget.setXy}
            wh={widget.wh}
            // setWh={widget.setWh}
            originalWh={widget.originalWh}
            // setOriginalWh={widget.setOriginalWh}
            zIndex={widget.zIndex}
            // setZIndex={widget.setZIndex}
            scale={widget.scale}
            // setScale={widget.setScale}
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
