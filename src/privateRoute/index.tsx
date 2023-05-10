import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'
import { useAuthState } from '../store/auth'

const ProtectedRoute = () => {
  const { userId } = useAuthState()
  if (!userId) return <Navigate to='/login' />

  return (
    <>
      <Outlet />
    </>
  )
}

export default ProtectedRoute
