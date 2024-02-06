import React from 'react'
import { CommonWidgetProperties } from '../../../store/features/storedWidgetsSlice'
import Widget from '../../molecule/Widget'

export interface GoogleSheetProperties {
  src: string
  // sheetWidth: number
  // sheetHeight: number
}

interface GoogleSheetProps extends CommonWidgetProperties, GoogleSheetProperties { }

const GoogleSheets = ({
  id,
  name,
  type = 'GoogleSheets',
  editMode,
  zIndex,
  xy,
  wh,
  minWH,
  scale,
  src
}: GoogleSheetProps): JSX.Element => {

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
      <iframe
        style={{ height: wh.h, width: wh.w }}
        src={src}
        onLoad={(): void => { console.log('Logged!') }}
      />
    </Widget>
  )
}

export default GoogleSheets
