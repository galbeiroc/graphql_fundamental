export const Persons = ({ persons }) => {
  if (!persons) return null

  return (
    <div>
      <h3>Persons</h3>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.phone}
        </div>
      ))}
    </div>
  )
}