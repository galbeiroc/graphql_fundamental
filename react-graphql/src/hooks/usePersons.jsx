import { useQuery, useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_PERSONS, FIND_PERSON } from '../graphql/queries'

export const usePersons = () => {
  const result = useQuery(ALL_PERSONS)

  return result
}

export const useFindPerson = () => {
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

  return { person, showPerson, setPerson }
}
