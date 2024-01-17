import { StoredThemesState } from '../features/storedThemeSlice'
import { StoredImagesState } from '../features/storedImagesSlice'
import { StoredWidgetsState } from '../features/storedWidgetsSlice'

export interface RootState {
  storedImages: StoredImagesState
  storedThemes: StoredThemesState
  storedWidgets: StoredWidgetsState
  // add as we need
}

export const saveToStorage = (state: RootState): void => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('reduxState', serializedState)
  } catch (e) {
    console.error('Error saving state to localStorage: ', e)
  }
}

export const loadFromStorage = (): RootState | undefined  => {
  try {
    const serializedState = localStorage.getItem('reduxState')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (e) {
    console.error('Error loading state from localStorage: ', e)
    return undefined
  }
}
