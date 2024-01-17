import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GoogleCalendarProperties } from '../../components/widgets/GoogleCalendar'

type WidgetValues = GoogleCalendarProperties

export interface StoredWidgetState {
  id: string
  name: string
  type: string
  wh: { w: number, h: number }
  xy: { x: number, y: number }
  originalWh: { w: number, h: number }
  zIndex: number
  scale: { x: number, y: number }
  // pageId ?
  widgetValues: WidgetValues
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
    updateWidget: (state, action: PayloadAction<StoredWidgetState>) => {
      state.widgets = state.widgets.map((widget) => {
        if (widget.id === action.payload.id) {
          return action.payload
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
