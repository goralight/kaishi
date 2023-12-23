import React from 'react'

import { useAppSelector } from '../store/store'

const ListPerson = (): JSX.Element => {
  const persons = useAppSelector((state) => state.person.persons)

  return (
    <div>
      <p>list:</p>
      {persons.map((person: any) => (
        <div key={person.name}>
          <p>{person.name}</p>
          <p>{person.age}</p>
        </div>
      ))}
    </div>
  )
}

export default ListPerson
