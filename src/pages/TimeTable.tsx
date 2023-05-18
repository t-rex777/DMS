import React from 'react'
import AppLayout from '../AppLayout'
import { useAuthState } from '../store/auth'
import AddTimetable from '../components/AddTimetable'
import ViewTimetable from '../components/ViewTimetable'

const TimeTable = () => {
  const { role } = useAuthState()

  return <AppLayout>{role !== 'student' ? <AddTimetable /> : <ViewTimetable />}</AppLayout>
}

export default TimeTable
