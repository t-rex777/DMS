import React from 'react'
import AppLayout from '../AppLayout'
import { useAuthState } from '../store/auth'

const Home = () => {
  const { role } = useAuthState()

  return <AppLayout></AppLayout>
}

export default Home
