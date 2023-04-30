import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthState } from '../store/auth'

const adminNavList = [
  {
    id: 1,
    link: '/approvals',
    label: 'Staff Verification',
  },

  {
    id: 2,
    label: 'Add Course',
    link: '/add-course',
  },

  {
    id: 3,
    label: 'Assign Course',
    link: '/assign-course',
  },

  {
    id: 4,
    label: 'User Details',
    link: '/user-details',
  },

  {
    id: 5,
    label: 'Feedbacks',
    link: '/feedbacks',
  },
]

const staffNavList = [
  {
    id: 1,
    label: 'Students Verification',
    link: '/approvals',
  },

  {
    id: 2,
    label: 'Student Details',
    link: '/student-details',
  },

  {
    id: 3,
    label: 'Time Table',
    link: '/time-table',
  },

  {
    id: 4,
    label: 'Notice',
    link: '/notice',
  },

  {
    id: 5,
    label: 'External Result',
    link: '/external-result',
  },
  {
    id: 6,
    label: 'Placement Records',
    link: '/placement-records',
  },
]

const facultyNavList = [
  {
    id: 1,
    label: 'User details',
    link: '/user-details',
  },

  {
    id: 2,
    label: 'Internal Result',
    link: '/internal-result',
  },

  {
    id: 3,
    label: 'Assignment',
    link: '/assignment',
  },

  {
    id: 4,
    label: 'Attendance',
    link: '/attendance',
  },

  {
    id: 5,
    label: 'Notice',
    link: '/notice',
  },
  {
    id: 6,
    label: 'Time Table',
    link: '/time-table',
  },
]

const studentNavList = [
  {
    id: 1,
    label: 'User details',
    link: '/user-details',
  },

  {
    id: 2,
    label: 'Internal Result',
    link: '/internal-result',
  },

  {
    id: 3,
    label: 'Assignment',
    link: '/assignment',
  },
  {
    id: 4,
    label: 'Time Table',
    link: '/timetable',
  },
  {
    id: 5,
    label: 'Feedback',
    link: '/feedback',
  },
  {
    id: 6,
    label: 'Result',
    link: '/result',
  },
  {
    id: 7,
    label: 'Notice',
    link: '/notice',
  },
  {
    id: 8,
    label: 'Attendance',
    link: '/attendance',
  },
]

const Sidebar = () => {
  const { name, email } = useAuthState()

  return (
    <div className='absolute left-0 top-0 h-screen w-48 bg-slate-600 flex flex-col justify-between px-4 py-2'>
      <div className='mt-16 flex flex-col gap-4'>
        {studentNavList.map(({ id, label, link }) => (
          <div key={id} className='bg-primary p-1 rounded hover:bg-secondary'>
            <Link to={link}>{label}</Link>
          </div>
        ))}
      </div>
      <div>
        <p className='text-primary'>{name}</p>
        <p className='text-primary'>{email}</p>
      </div>
    </div>
  )
}

export default Sidebar
