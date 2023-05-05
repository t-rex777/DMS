import React from 'react'
import AppLayout from '../AppLayout'
import { useAuthState } from '../store/auth'
import AddTimetable from '../components/AddTimetable'

const TimeTable = () => {
  const { role } = useAuthState()

  return (
    <AppLayout>
      {role !== 'student' ? (
        <AddTimetable />
      ) : (
        <>
          <div className=' text-3xl font-semibold mb-3'>Time Table</div>
          <img
            src='https://www.pmsboduppal.com/wp-content/uploads/2019/11/PERIODIC-ASSESSMENT-III-Time-table-std-1-10-1-1.jpg'
            alt='timetable'
          />
        </>
      )}
    </AppLayout>
  )
}

export default TimeTable
