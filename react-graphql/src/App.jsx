import reactLogo from './assets/react.svg'
import './App.css'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'
import { usePersons } from './hooks/usePersons'

function App() {
  const { data, error, loading } = usePersons()

  if (error) return <span style='color: red'>{error}</span>

  return (
    <div className="App">
      <img src={reactLogo} className="logo react" alt="React logo" />
      {loading
        ? <p>Loading...</p>
        : <Persons persons={data.allPersons} />
      }
      <PersonForm />
    </div>
  )
}

export default App
