import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GoogleCalendarProperties } from '../../components/widgets/GoogleCalendar'

type WidgetValues = GoogleCalendarProperties

export interface WidgetProperties {
  id: string
  name: string
  type: string
  wh: { w: number, h: number }
  xy: { x: number, y: number }
  originalWh: { w: number, h: number }
  zIndex: number
  scale: { x: number, y: number }
  // pageId ?
}

export interface StoredWidgetState extends WidgetProperties {
  widgetValues: WidgetValues
  // pageId ?
}

export interface CommonWidgetProperties extends WidgetProperties {
  editMode: boolean
}

export interface StoredWidgetsState {
  widgets: StoredWidgetState[]
}

const initialState: StoredWidgetsState = {
  widgets: []
}

export const storedWidgetsSlice = createSlice({
  name: 'storedWidgets',
  initialState: initialState,
  reducers: {
    addWidget: (state, action: PayloadAction<StoredWidgetState>) => {
      state.widgets = [...state.widgets, action.payload]
    },
    removeWidget: (state, action: PayloadAction<string>) => {
      state.widgets = state.widgets.filter((widget) => widget.id !== action.payload)
    },
    updateWidget: (state, action: PayloadAction<Partial<StoredWidgetState>>) => {
      state.widgets = state.widgets.map((widget) => {
        if (widget.id === action.payload.id) {
          return { ...widget, ...action.payload }
        }
        return widget
      })
    },
    updateAllWidgets: (state, action: PayloadAction<StoredWidgetState[]>) => {
      state.widgets = action.payload
    }
  }
})

export default storedWidgetsSlice.reducer
export const { addWidget, removeWidget, updateWidget, updateAllWidgets } = storedWidgetsSlice.actions
