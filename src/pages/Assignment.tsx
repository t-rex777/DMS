import React from 'react'
import { useAuthState } from '../store/auth'
import ViewAssignment from '../components/ViewAssignment'
import AddAssignment from '../components/AddAssignment'

const Assignment = () => {
  const { role = 'student' } = useAuthState()

  if (role === 'student') {
    return <ViewAssignment />
  }

  return <AddAssignment />
}

export default Assignment
