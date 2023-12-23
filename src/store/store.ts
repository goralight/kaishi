import { configureStore } from '@reduxjs/toolkit'
import PersonSlice from './features/personSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { loadFromStorage, saveToStorage } from './persist/localStorage'

const initialState = loadFromStorage()

export const store = configureStore({
  reducer: {
    person: PersonSlice.reducer
  }, // Add 'as any' to bypass the type checking
  preloadedState: initialState
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector

store.subscribe(() => {
  saveToStorage(store.getState())
})
