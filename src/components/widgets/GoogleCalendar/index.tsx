import React from 'react'
import Widget from '../../molecule/Widget'
import { CommonWidgetProperties, } from '../../../store/features/storedWidgetsSlice'

export interface GoogleCalendarProperties {
  src: string
  calendarWidth: number
  calendarHeight: number
}

interface GoogleCalendarProps extends CommonWidgetProperties, GoogleCalendarProperties { }

const GoogleCalendar: React.FC<GoogleCalendarProps> = ({
  id,
  name,
  type = 'GoogleCalendar',
  editMode,
  zIndex,
  xy,
  wh,
  originalWh,
  scale,
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
      xy={xy}
      originalWh={originalWh}
      zIndex={zIndex}
      scale={scale}
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
