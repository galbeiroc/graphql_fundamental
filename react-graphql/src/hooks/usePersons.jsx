import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { CREATE_PERSON, EDIT_NUMBER } from '../graphql/mutations'
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

export const useCreatePerson = (notifyError) => {
  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      notifyError(error.graphQLErrors[0].message)
    }
  })

  return createPerson
}

export const useEditPhone = () => {  
  const [editNumber] = useMutation(EDIT_NUMBER)

  return editNumber
}
