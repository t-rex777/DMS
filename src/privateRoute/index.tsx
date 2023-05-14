import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'
import { useAuthState } from '../store/auth'

const ProtectedRoute = () => {
  const { userId, isApproved, role } = useAuthState()
  if (!userId) return <Navigate to='/login' />
  if (!isApproved && role !== 'admin') return <Navigate to='/profile-review' />

  return (
    <>
      <Outlet />
    </>
  )
}

export default ProtectedRoute
