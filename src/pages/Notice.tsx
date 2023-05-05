import React from 'react'
import AppLayout from '../AppLayout'
import { useAuthState } from '../store/auth'
import ViewNotice from '../components/ViewNotice'
import AddNotice from '../components/AddNotice'

const Notice = () => {
  const { role } = useAuthState()

  return <AppLayout>{role !== 'student' ? <ViewNotice /> : <AddNotice />}</AppLayout>
}

export default Notice
