import React, { useState } from 'react'
import Widget, { CommonWidgetProps } from '../../molecule/Widget'
import Icon from '../../atoms/Icon'

interface GoogleCalendarProps extends CommonWidgetProps {
  src: string
  calendarWidth: number
  calendarHeight: number
}

const GoogleCalendar: React.FC<GoogleCalendarProps> = ({
  id,
  name,
  editMode,
  zIndex,
  setZIndex,
  xy,
  setXy,
  wh,
  setWh,
  originalWh,
  setOriginalWh,
  scale,
  setScale,
  src,
  calendarWidth,
  calendarHeight
}: GoogleCalendarProps) => {
  const [showAddMenu, setShowAddMenu] = useState(false)

  return (
    <Widget
      id={id}
      name={name}
      editMode={editMode}
      wh={wh}
      setWh={setWh}
      xy={xy}
      setXy={setXy}
      originalWh={originalWh}
      setOriginalWh={setOriginalWh}
      zIndex={zIndex}
      setZIndex={setZIndex}
      scale={scale}
      setScale={setScale}
    >
      <div>
        <iframe
          // src="https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23ffffff&ctz=Europe%2FLondon&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=1&showTz=1&src=Njk1M2E3MDkwZTY3NjQ4OWYwYTM0N2YwMWIzMDNjNTkwODc0NTZlY2UyZDcxYzJmNWU4MTAyZWRlYmM2YTEyZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udWsjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23D50000&color=%230B8043"
          src={src}
          width={calendarWidth}
          height={calendarHeight}
          style={{ borderWidth: '0' }}
        />
        <Icon icon={!showAddMenu ? 'plus-circle' : 'xmark-circle'} prefix='fas' color='primary' onClick={() => { setShowAddMenu(!showAddMenu) }} />
        {showAddMenu ? (
          <div>
            add menu
          </div>
        ) : null}
      </div>
    </Widget>
  )
}

export default GoogleCalendar
