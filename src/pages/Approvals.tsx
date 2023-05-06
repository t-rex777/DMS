import React from 'react'
import AppLayout from '../AppLayout'
import { useAuthState } from '../store/auth'
import ApprovalTable from '../components/ApprovalTable'

const Approvals = () => {
  const { role } = useAuthState()

  return (
    <AppLayout>
      <ApprovalTable />
    </AppLayout>
  )
}

export default Approvals
