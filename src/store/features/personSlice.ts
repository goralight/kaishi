import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface Person {
  id: number
  name: string
  age: number
}

interface PersonState {
  persons: Person[]
}

const initialState: PersonState = {
  persons: []
}

export const PersonSlice = createSlice({
  name: 'person',
  initialState: initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<{ name: string, age: number }>) => {
      state.persons.push({
        id: Math.random(),
        name: action.payload.name,
        age: action.payload.age
      })
    },
    removePerson: (state, action: PayloadAction<number>) => {
      state.persons = state.persons.filter(person => person.id !== action.payload)
    },
    updatePerson: (state, action: PayloadAction<Person>) => {
      const index = state.persons.findIndex(person => person.id === action.payload.id)
      state.persons[index] = action.payload
    }
  }
})

export default PersonSlice
export const { addPerson, removePerson, updatePerson } = PersonSlice.actions
