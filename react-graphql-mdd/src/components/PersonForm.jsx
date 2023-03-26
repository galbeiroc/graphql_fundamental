import { useCallback, useState } from 'react'
import { useCreatePerson } from '../hooks/usePersons'

export const PersonForm = ({ notifyError }) => {
  const [newPerson, setNewPerson] = useState({ name: '', phone: '', street: '', city: '' })
  const createPerson = useCreatePerson(notifyError)

  const handleChange = ({ target: { name, value }}) => {
    setNewPerson({ ...newPerson, [name]: value })
  }

  const handleSubmit = useCallback((e) => {
    e.preventDefault()

    createPerson({ variables: { ...newPerson }})

    setNewPerson({ name: '', phone: '', street: '', city: '' })
  }, [])

  return (
    <div>
      <h2>Create New Person</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder='Name' name='name' value={newPerson.name} onChange={handleChange} />
        <input placeholder='Phone' name='phone' value={newPerson.phone} onChange={handleChange} />
        <input placeholder='Street' name='street' value={newPerson.street} onChange={handleChange} />
        <input placeholder='City' name='city' value={newPerson.city} onChange={handleChange} />
        <button>Send Person</button>
      </form>
    </div>
  )
}
