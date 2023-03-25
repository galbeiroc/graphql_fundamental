import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'
import { usePersons } from './hooks/usePersons'
import { Notify } from './components/Notify'
import { PhoneForm } from './components/PhoneForm'

function App() {
  const { data, error, loading } = usePersons()
  const [errorMessage, setErrorMessage] = useState(null)

  if (error) return <span style={{ color: 'red' }}>{error}</span>

  const notifyError = message => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  return (
    <div className="App">
      <Notify errorMessage={errorMessage} />
      <img src={reactLogo} className="logo react" alt="React logo" />
      {loading
        ? <p>Loading...</p>
        : <Persons persons={data.allPersons} />
      }
      <PhoneForm />
      <PersonForm notifyError={notifyError} />
    </div>
  )
}

export default App
