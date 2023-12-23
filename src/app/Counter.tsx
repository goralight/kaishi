import React from 'react'

import { useAppSelector, useAppDispatch } from '../store/store'
import { decrement, increment } from '../store/features/counterSlice'

const ListPerson = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const storeCount = useAppSelector((state) => state.counter.count)

  const handleAdd = (): void => {
    dispatch(increment(1))
  }

  const handleSub = (): void => {
    dispatch(decrement(1))
  }


  return (
    <div>
      <p style={{ color: 'white' }}>count: {storeCount}</p>
      <button onClick={handleAdd}>add</button>
      <button onClick={handleSub}>sub</button>
    </div>
  )
}

export default ListPerson
