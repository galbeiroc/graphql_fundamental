import { useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useState } from 'react'
import { FIND_PERSON } from '../graphql/queries'



export const Persons = ({ persons }) => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON)
  const [person, setPerson] = useState(null)

  const showPerson = name => {
    getPerson({ variables: { nameToSearch: name }})
  }

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson)
    }
  }, [result])

  if (person) {
    return (
      <>
        <p>{person.name}</p>
        <p>{person.address.street}, {person.address.city}</p>
        <button onClick={() => setPerson(null)}>Close</button>
      </>
    )
  }

  if (!persons) return null

  return (
    <div>
      <h3>Persons</h3>
      {persons.map((person) => (
        <div key={person.id} onClick={() => showPerson(person.name)}>
          {person.name} {person.phone}
        </div>
      ))}
    </div>
  )
}
