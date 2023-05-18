import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TRole, useAuthState } from '../store/auth'
export interface IListType {
  id: number
  label: string
  link: string
}

const adminNavList: IListType[] = [
  {
    id: 1,
    link: '/approvals',
    label: 'Users Approvals',
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

const staffNavList: IListType[] = [
  {
    id: 1,
    label: 'User details',
    link: '/user-details',
  },

  {
    id: 2,
    label: 'Student Details',
    link: '/students',
  },

  {
    id: 3,
    label: 'Time Table',
    link: '/timetable',
  },

  {
    id: 5,
    label: 'External Result',
    link: '/result',
  },

  {
    id: 6,
    label: 'Placement',
    link: '/placement',
  },

  {
    id: 7,
    label: 'Student Placement',
    link: '/student-placement',
  },
  {
    id: 8,
    label: 'Assign Student',
    link: '/assign-student',
  },
]

const facultyNavList: IListType[] = [
  {
    id: 1,
    label: 'User details',
    link: '/user-details',
  },

  {
    id: 2,
    label: 'Internal Result',
    link: '/result',
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
    label: 'Student Details',
    link: '/students',
  },
]

const studentNavList: IListType[] = [
  {
    id: 1,
    label: 'User details',
    link: '/user-details',
  },

  {
    id: 2,
    label: 'Results',
    link: '/results',
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
    link: '/feedbacks',
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
  const { name, email, role } = useAuthState()
  const navigate = useNavigate()

  const assignList: Record<TRole, IListType[]> = {
    admin: adminNavList,
    faculty: facultyNavList,
    staff: staffNavList,
    student: studentNavList,
  }

  return (
    <div className='absolute left-0 top-0 h-screen w-48 bg-slate-900 flex flex-col justify-between px-4 py-2'>
      <div className='mt-16 flex flex-col gap-4'>
        {assignList[role].map(({ id, label, link }) => (
          <div
            key={id}
            onClick={() => navigate(link)}
            className='bg-primary p-1 rounded hover:bg-secondary cursor-pointer'
          >
            <h2 className='w-full'>{label}</h2>
          </div>
        ))}
      </div>
      <div>
        <p className='text-primary truncate'>{name}</p>
        <p className='text-primary truncate'>{email}</p>
      </div>
    </div>
  )
}

export default Sidebar
