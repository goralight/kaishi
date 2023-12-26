import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { loadFromStorage, saveToStorage } from './persist/localStorage'
import storedImagesSlice from './features/storedImagesSlice'

const initialState = loadFromStorage()

export const store = configureStore({
  reducer: {
    storedImages: storedImagesSlice
    // add as we need
  },
  preloadedState: initialState
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector

store.subscribe(() => {
  saveToStorage(store.getState())
})
