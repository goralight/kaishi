import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  count: number
}

const initialState: CounterState = {
  count: 7
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.count += action.payload
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.count -= action.payload
    }
  }
})

export default counterSlice.reducer
export const { increment, decrement } = counterSlice.actions
