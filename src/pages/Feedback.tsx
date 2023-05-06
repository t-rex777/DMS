import React from 'react'
import { useAuthState } from '../store/auth'
import AppLayout from '../AppLayout'
import ViewFeedback from '../components/ViewFeedback'
import AddFeedback from '../components/AddFeedback'

const Feedback = () => {
  const { role } = useAuthState()

  return <AppLayout>{role !== 'student' ? <ViewFeedback /> : <AddFeedback />}</AppLayout>
}

export default Feedback
