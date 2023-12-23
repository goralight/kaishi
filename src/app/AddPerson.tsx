import React, { useState } from 'react'
import { useAppDispatch } from '../store/store'
import { addPerson } from '../store/features/personSlice'

const AddPerson = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const [value, setValue] = useState('')

  const handleOnClick = (): void => {
    dispatch(addPerson({
      name: value,
      age: 18
    }))
    setValue('')
  }

  return (
    <div>
      <label htmlFor='name-input'>name</label>
      <input
        type="text"
        id='name-input'
        value={value}
        onChange={(e): void => setValue(e.target.value)}
      />
      <button
        onClick={handleOnClick}
      >
        Add Person
      </button>
    </div>
  )
}

export default AddPerson
