import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { loadFromStorage, saveToStorage } from './persist/localStorage'
import storedImagesSlice from './features/storedImagesSlice'
import themeSlice from './features/ThemeSlice'

const initialState = loadFromStorage()

export const store = configureStore({
  reducer: {
    storedImages: storedImagesSlice,
    storedThemes: themeSlice
    // add as we need
  },
  preloadedState: initialState
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector

store.subscribe(() => {
  saveToStorage(store.getState())
})
