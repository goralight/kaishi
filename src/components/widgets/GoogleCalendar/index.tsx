import React from 'react'
import Widget, { CommonWidgetProps } from '../../molecule/Widget'

export interface GoogleCalendarProperties {
  src: string
  calendarWidth: number
  calendarHeight: number
}

interface GoogleCalendarProps extends CommonWidgetProps, GoogleCalendarProperties { }

const GoogleCalendar: React.FC<GoogleCalendarProps> = ({
  id,
  name,
  type = 'GoogleCalendar',
  editMode,
  zIndex,
  // setZIndex,
  xy,
  // setXy,
  wh,
  // setWh,
  originalWh,
  // setOriginalWh,
  scale,
  // setScale,
  setAllWidgetValues,
  src,
  calendarWidth,
  calendarHeight
}: GoogleCalendarProps) => {

  return (
    <Widget
      id={id}
      name={name}
      type={type}
      editMode={editMode}
      wh={wh}
      // setWh={setWh}
      xy={xy}
      // setXy={setXy}
      originalWh={originalWh}
      // setOriginalWh={setOriginalWh}
      zIndex={zIndex}
      // setZIndex={setZIndex}
      scale={scale}
      // setScale={setScale}
      setAllWidgetValues={setAllWidgetValues}
    >
      <iframe
        title={name}
        src={src}
        width={calendarWidth}
        height={calendarHeight}
        style={{ borderWidth: '0' }}
      />
    </Widget>
  )
}

export default GoogleCalendar
