import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Palette, StandardTheme, standardTheme } from '../../theme'

export interface ThemeState  {
  id: string
  name: string
  theme: StandardTheme
}

export interface ThemesState {
  themes: ThemeState[]
  selectedThemeId: string
}

const initialState: ThemesState = {
  themes: [
    {
      id: 'default',
      name: 'default',
      theme: standardTheme
    }
  ],
  selectedThemeId: 'default'
}

export const themeSlice = createSlice({
  name: 'themes',
  initialState: initialState,
  reducers: {
    addTheme: (state, action: PayloadAction<ThemeState>) => {
      state.themes = [...state.themes, action.payload]
    },
    removeTheme: (state, action: PayloadAction<string>) => {
      if (action.payload === 'default') {
        return
      }
      if (action.payload === state.selectedThemeId) {
        state.selectedThemeId = 'default'
      }
      state.themes = state.themes.filter((theme) => theme.id !== action.payload)
    },
    updateTheme: (state, action: PayloadAction<ThemeState>) => {
      state.themes = state.themes.map((theme) => {
        if (theme.id === action.payload.id) {
          return action.payload
        }
        return theme
      })
    },
    selectTheme: (state, action: PayloadAction<string>) => {
      state.selectedThemeId = action.payload
    }
  }
})

export default themeSlice.reducer
export const { addTheme, removeTheme, updateTheme, selectTheme } = themeSlice.actions
