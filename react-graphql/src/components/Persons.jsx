import { useFindPerson } from "../hooks/usePersons"

export const Persons = ({ persons }) => {
  const { person, showPerson, setPerson } = useFindPerson()

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
