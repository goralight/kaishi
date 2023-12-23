import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './features/counterSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { loadFromStorage, saveToStorage } from './persist/localStorage'

const initialState = loadFromStorage()

export const store = configureStore({
  reducer: {
    counter: counterSlice
    // add as we need
  },
  preloadedState: initialState
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector

store.subscribe(() => {
  saveToStorage(store.getState())
})
