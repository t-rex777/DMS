import React from 'react'
import { useAuthState } from '../store/auth'
import AppLayout from '../AppLayout'
import ViewResult from '../components/ViewResult'
import AddResult from '../components/AddResult'

const Result = () => {
  const { role } = useAuthState()

  const type = role === 'staff' ? 'External' : 'Internal'

  return <AppLayout>{role === 'student' ? <ViewResult /> : <AddResult type={type} />}</AppLayout>
}

export default Result
