import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import { ALL_PERSONS } from '../App'

const CREATE_PERSON = gql`
  mutation createPerson($name: String!, $phone: String, $street: String!, $city: String!) {
    addPerson(
      name: $name
      phone: $phone
      street: $street
      city: $city
    ) {
      name
      phone
      address {
        city
        street
      }
      id
    }
  }
`
export const PersonForm = () => {
  const [newPerson, setNewPerson] = useState({ name: '', phone: '', street: '', city: '' })
  
  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }]
  })

  const handleChange = ({ target: { name, value }}) => {
    setNewPerson({...newPerson, [name]: value})
  }

  const handleSubmit = e => {
    e.preventDefault()

    createPerson({ variables: { ...newPerson }})

    setNewPerson({ name: '', phone: '', street: '', city: '' })
  }

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
