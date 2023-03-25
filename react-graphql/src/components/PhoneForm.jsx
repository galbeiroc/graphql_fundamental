import { useState } from 'react'
import { useEditPhone } from '../hooks/usePersons'

export const PhoneForm = () => {
  const [editPhone, setEditPhone] = useState({ name: '', phone: '' })
  const editNumber = useEditPhone()

  const handleChange = ({ target: { name, value }}) => {
    setEditPhone({ ...editPhone, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    editNumber({ variables: { ...editPhone }})

    setEditPhone({ name: '', phone: '' })
  }
  console.log(editPhone)

  return (
    <div>
      <h2>Edit Phone Number</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder='Name' name='name' value={editPhone.name} onChange={handleChange} />
        <input placeholder='Phone' name='phone' value={editPhone.phone} onChange={handleChange} />
        <button>Change Phone</button>
      </form>
    </div>
  )
}