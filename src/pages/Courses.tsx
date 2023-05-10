import React from 'react'
import { useAuthState } from '../store/auth'
import AddAttendance from '../components/AddAttendance'
import ViewAttendance from '../components/ViewAttendance'
import AppLayout from '../AppLayout'

const Courses = () => {
  const { role } = useAuthState()

  return <AppLayout>{role !== 'student' ? <ViewAttendance /> : <AddAttendance />}</AppLayout>
}

export default Courses
